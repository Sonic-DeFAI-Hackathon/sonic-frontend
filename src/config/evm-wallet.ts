/**
 * EVM Wallet Integration
 * Integration with EVM-compatible blockchains using Web3 libraries
 */
import { createPublicClient, createWalletClient, custom, http, PublicClient, WalletClient } from 'viem';
import { getConfig } from '@/config/evm';
import { chainSelector, ChainId } from './chain-selector';

// Extend Window interface to include ethereum property
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      selectedAddress?: string;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

// Interface for transaction response
export interface TransactionResponse {
  hash: string;
  status: string;
  success?: boolean;
  errorMessage?: string;
  transactionHash?: string;
}

// Define ABI type to avoid using 'any'
export type ContractAbi = any[]; // Using any[] to fix compatibility issues with contract artifacts

/**
 * EVM Wallet Class
 * Provides wallet functionality for interacting with EVM-compatible blockchains
 */
export class EVMWallet {
  private walletClient: WalletClient | null = null;
  private publicClient: PublicClient | null = null;
  private address: string | null = null;
  private config = getConfig();
  private chainId: ChainId = chainSelector.getCurrentChainId();

  /**
   * Initialize the wallet
   */
  async init(): Promise<boolean> {
    try {
      // Skip initialization in Node.js environment
      if (typeof window === 'undefined') {
        return true;
      }

      // Check if window.ethereum is available
      if (!window.ethereum) {
        console.warn('No wallet provider found');
        return false;
      }

      // Create a public client for read-only operations
      this.publicClient = createPublicClient({
        chain: chainSelector.getCurrentChain(),
        transport: http(this.config.nodeUrl),
      });

      // Get stored address from localStorage
      const savedAddress = localStorage.getItem('evmAddress');
      if (savedAddress) {
        this.address = savedAddress;
      }

      // If already connected to wallet, initialize wallet client
      if (window.ethereum.selectedAddress) {
        this.address = window.ethereum.selectedAddress;
        
        // Only store address if it's not null
        if (this.address) {
          localStorage.setItem('evmAddress', this.address);
        }

        // Create wallet client
        this.walletClient = createWalletClient({
          chain: chainSelector.getCurrentChain(),
          transport: custom(window.ethereum!),
        });

        // Switch to the correct network if needed
        await this.ensureCorrectNetwork();
      }

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected wallet
          this.address = null;
          localStorage.removeItem('evmAddress');
        } else {
          // User switched account
          this.address = accounts[0];
          if (this.address) {
            localStorage.setItem('evmAddress', this.address);
          }
        }
      });

      return true;
    } catch (error) {
      console.error('Error initializing EVM wallet:', error);
      return false;
    }
  }

  /**
   * Connect to wallet
   */
  async connectWallet(): Promise<boolean> {
    try {
      if (!window.ethereum) {
        console.warn('No wallet provider found');
        return false;
      }

      // Request account access - explicitly type the response as string array
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      // Now TypeScript knows accounts is a string array with length property
      if (accounts && accounts.length > 0) {
        this.address = accounts[0];
        // Only store address if it's not null
        if (this.address) {
          localStorage.setItem('evmAddress', this.address);
        }

        // Create wallet client
        this.walletClient = createWalletClient({
          chain: chainSelector.getCurrentChain(),
          transport: custom(window.ethereum!),
        });

        // Switch to the correct network if needed
        await this.ensureCorrectNetwork();
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error connecting to EVM wallet:', error);
      return false;
    }
  }

  /**
   * Ensure the wallet is connected to the correct network
   */
  private async ensureCorrectNetwork(): Promise<boolean> {
    try {
      const currentChain = chainSelector.getCurrentChain();
      const chainId = currentChain.id;
      
      if (!window.ethereum) return false;
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
        return true;
      } catch (switchError: unknown) {
        // Chain doesn't exist, add it
        const error = switchError as { code: number };
        if (error.code === 4902) {
          await this.addEVMNetwork();
          return true;
        }
        throw error;
      }
    } catch (error) {
      console.error('Error ensuring correct network:', error);
      return false;
    }
  }

  /**
   * Add the EVM network to the wallet if it doesn't exist
   */
  private async addEVMNetwork(): Promise<void> {
    const currentChain = chainSelector.getCurrentChain();
    const chainId = currentChain.id;
    const networkName = currentChain.name;
    const nativeCurrency = currentChain.nativeCurrency;
    const rpcUrl = currentChain.rpcUrls.default.http[0];
    const blockExplorerUrl = currentChain.blockExplorers?.default?.url;
    
    if (!window.ethereum) return;
    
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${chainId.toString(16)}`,
          chainName: networkName,
          nativeCurrency: {
            name: nativeCurrency.name,
            symbol: nativeCurrency.symbol,
            decimals: nativeCurrency.decimals,
          },
          rpcUrls: [rpcUrl],
          blockExplorerUrls: blockExplorerUrl ? [blockExplorerUrl] : undefined,
        },
      ],
    });
  }

  /**
   * Sign out from wallet
   */
  async signOut(): Promise<boolean> {
    this.address = null;
    localStorage.removeItem('evmAddress');
    return true;
  }

  /**
   * Get the connected wallet address
   */
  getAddress(): string | null {
    return this.address;
  }

  /**
   * Check if wallet is connected
   */
  isConnected(): boolean {
    return !!this.address && !!this.walletClient;
  }

  /**
   * Call a view method on a contract
   */
  async callViewMethod<T>(
    contractAddress: string,
    abi: ContractAbi,
    methodName: string,
    args: unknown[] = []
  ): Promise<T> {
    try {
      if (!this.publicClient) {
        throw new Error('Public client not initialized');
      }

      const result = await this.publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: methodName,
        args,
      });

      return result as T;
    } catch (error) {
      console.error(`Error calling view method ${methodName}:`, error);
      throw error;
    }
  }

  /**
   * Call a method on a contract that requires signing
   */
  async callMethod(
    contractAddress: string,
    abi: ContractAbi,
    methodName: string,
    args: unknown[] = [],
    value: bigint = BigInt(0)
  ): Promise<TransactionResponse> {
    try {
      if (!this.isConnected()) {
        throw new Error('Wallet not connected');
      }

      // Get gas settings
      const gasSettings = await this.getGasSettings();

      // Prepare transaction
      const txParams = {
        account: this.address ? (this.address as `0x${string}`) : null,
        address: contractAddress as `0x${string}`,
        abi,
        functionName: methodName,
        args,
        value,
        chain: chainSelector.getCurrentChain(),
        ...(gasSettings || {}),
      };

      // Send transaction
      if (!this.walletClient) {
        throw new Error('Wallet client not initialized');
      }
      
      // Type assertion to handle the complex type requirements of viem
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hash = await this.walletClient.writeContract(txParams as any);

      // Wait for transaction receipt
      if (!this.publicClient) {
        throw new Error('Public client not initialized');
      }
      const receipt = await this.publicClient.waitForTransactionReceipt({
        hash,
      });

      // Check if transaction was successful
      const success = receipt.status === 'success';

      return {
        hash: hash,
        status: receipt.status,
        success,
        transactionHash: hash,
      };
    } catch (error) {
      console.error(`Error calling method ${methodName}:`, error);
      return {
        hash: '',
        status: 'error',
        success: false,
        errorMessage: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Get gas settings for transactions
   */
  private async getGasSettings(): Promise<{ gasPrice?: bigint; gas?: bigint }> {
    try {
      if (!this.publicClient) {
        return {};
      }
      
      // Get current gas price
      const gasPrice = await this.publicClient.getGasPrice();
      
      // Add 10% buffer to gas price
      const adjustedGasPrice = (gasPrice * BigInt(110)) / BigInt(100);
      
      return {
        gasPrice: adjustedGasPrice,
      };
    } catch (error) {
      console.warn('Error getting gas settings:', error);
      return {};
    }
  }

  /**
   * Set the chain to use
   */
  setChain(chainId: ChainId): void {
    chainSelector.setChainById(chainId);
    this.chainId = chainId;
    
    // Reinitialize clients with new chain
    if (typeof window !== 'undefined' && window.ethereum) {
      this.publicClient = createPublicClient({
        chain: chainSelector.getCurrentChain(),
        transport: http(this.config.nodeUrl),
      });
      
      if (this.isConnected()) {
        this.walletClient = createWalletClient({
          chain: chainSelector.getCurrentChain(),
          transport: custom(window.ethereum!),
        });
        
        // Ensure correct network
        this.ensureCorrectNetwork().catch(console.error);
      }
    }
  }

  /**
   * Get the current chain ID
   */
  getChainId(): ChainId {
    return this.chainId;
  }
}

// Create singleton instance
export const evmWallet = new EVMWallet();

// Initialize wallet on load
if (typeof window !== 'undefined') {
  evmWallet.init().catch(console.error);
}