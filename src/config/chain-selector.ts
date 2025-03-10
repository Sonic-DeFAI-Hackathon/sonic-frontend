/**
 * Chain Selector
 * 
 * Handles selection and management of blockchain networks
 */

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
    
    // Add Sonic Blaze Testnet (only chain we're using)
    this.chains[57054] = {
      chainId: 57054,
      name: "Sonic Blaze Testnet",
      rpcUrl: "https://rpc.blaze.soniclabs.com",
      blockExplorerUrl: "https://testnet.sonicscan.org",
      nativeCurrency: {
        name: "Sonic",
        symbol: "S",
        decimals: 18,
      },
      predictionMarketContract: "0xC44DE09ab7eEFC2a9a2116E04ca1fcEc86F520fF",
      gameModesContract: "0xC44DE09ab7eEFC2a9a2116E04ca1fcEc86F520fF",
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
}

// Export a singleton instance
export const chainSelector = new ChainSelector();
export default chainSelector;