/**
 * Chain Selector
 * 
 * Handles selection and management of blockchain networks
 */
// Remove the unused import
// import type { BlockchainNetworkConfig } from '@/schemas/blockchain';

export interface ChainConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  predictionMarketContract: string;
  gameModesContract: string;
}

/**
 * Chain Selector - Manages available chains and current selection
 */
class ChainSelector {
  private chains: Record<number, ChainConfig> = {};
  private activeChainId: number;
  
  constructor() {
    // Initialize with Sonic Blaze Testnet by default
    this.activeChainId = 57054;
    
    // Add Sonic Blaze Testnet
    this.chains[57054] = {
      chainId: 57054,
      name: "Sonic Blaze Testnet",
      rpcUrl: "https://sonic-testnet.drpc.org",
      blockExplorerUrl: "https://explorer.sonic.app",
      nativeCurrency: {
        name: "Sonic",
        symbol: "S",
        decimals: 18,
      },
      predictionMarketContract: "0x1234567890123456789012345678901234567890",
      gameModesContract: "0x0987654321098765432109876543210987654321",
    };
    
    // Add Sepolia testnet
    this.chains[11155111] = {
      chainId: 11155111,
      name: "Sepolia",
      rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/your-api-key",
      blockExplorerUrl: "https://sepolia.etherscan.io",
      nativeCurrency: {
        name: "Sepolia Ether",
        symbol: "ETH",
        decimals: 18,
      },
      predictionMarketContract: "0x1234567890123456789012345678901234567890",
      gameModesContract: "0x0987654321098765432109876543210987654321",
    };
    
    // Add Arbitrum Sepolia testnet
    this.chains[421614] = {
      chainId: 421614,
      name: "Arbitrum Sepolia",
      rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
      blockExplorerUrl: "https://sepolia.arbiscan.io",
      nativeCurrency: {
        name: "Arbitrum Sepolia Ether",
        symbol: "ETH",
        decimals: 18,
      },
      predictionMarketContract: "0xabcdef1234567890abcdef1234567890abcdef12",
      gameModesContract: "0x123456abcdef7890123456abcdef7890123456ab",
    };
  }
  
  /**
   * Get all available chains
   */
  getChains(): ChainConfig[] {
    return Object.values(this.chains);
  }
  
  /**
   * Get chain by ID
   */
  getChain(chainId: number): ChainConfig | undefined {
    return this.chains[chainId];
  }
  
  /**
   * Get currently active chain
   */
  getActiveChain(): ChainConfig {
    return this.chains[this.activeChainId];
  }
  
  /**
   * Set active chain
   */
  setActiveChain(chainId: number): boolean {
    if (this.chains[chainId]) {
      this.activeChainId = chainId;
      return true;
    }
    return false;
  }
  
  /**
   * Get current active chain ID
   */
  getActiveChainId(): number {
    return this.activeChainId;
  }
  
  /**
   * Add or update a chain configuration
   */
  addChain(config: ChainConfig): void {
    this.chains[config.chainId] = config;
  }
  
  /**
   * Check if chain is supported
   */
  isChainSupported(chainId: number): boolean {
    return !!this.chains[chainId];
  }

  /**
   * Get the address of the game modes contract for the active chain
   */
  getGameModesAddress(): string {
    return this.chains[this.activeChainId].gameModesContract;
  }
  
  /**
   * Get the address of the prediction market contract for the active chain
   */
  getPredictionMarketAddress(): string {
    return this.chains[this.activeChainId].predictionMarketContract;
  }

  /**
   * Get current chain configuration (alias for getActiveChain)
   */
  getCurrentConfig(): ChainConfig {
    return this.getActiveChain();
  }

  /**
   * Get current chain ID (alias for getActiveChainId)
   */
  getCurrentChainId(): number {
    return this.activeChainId;
  }
  
  /**
   * Get current chain
   */
  getCurrentChain(): ChainConfig {
    return this.chains[this.activeChainId];
  }
}

// Export a singleton instance
export const chainSelector = new ChainSelector();
export default chainSelector;