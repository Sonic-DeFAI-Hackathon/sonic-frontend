/**
 * Chain Selector
 * 
 * This module provides a mechanism to select and manage different EVM chains
 * in the application. It allows for easy switching between chains and provides
 * a consistent interface for chain-specific configurations.
 */
import { Chain } from 'viem';
import { 
  sonicBlazeTestnet, 
  evmMainnet, 
  evmTestnet, 
  ethereumMainnet, 
  ethereumSepolia 
} from './chain';

// Define available chains
export enum ChainId {
  SONIC_BLAZE_TESTNET = 57054,
  EVM_MAINNET = 52014,
  EVM_TESTNET = 5201420,
  ETHEREUM_MAINNET = 1,
  ETHEREUM_SEPOLIA = 11155111,
}

// Chain name mapping
export const CHAIN_NAMES = {
  [ChainId.SONIC_BLAZE_TESTNET]: 'Sonic Blaze Testnet',
  [ChainId.EVM_MAINNET]: 'EVM Mainnet',
  [ChainId.EVM_TESTNET]: 'EVM Testnet',
  [ChainId.ETHEREUM_MAINNET]: 'Ethereum Mainnet',
  [ChainId.ETHEREUM_SEPOLIA]: 'Ethereum Sepolia',
};

// Chain object mapping
export const CHAINS: Record<ChainId, Chain> = {
  [ChainId.SONIC_BLAZE_TESTNET]: sonicBlazeTestnet,
  [ChainId.EVM_MAINNET]: evmMainnet,
  [ChainId.EVM_TESTNET]: evmTestnet,
  [ChainId.ETHEREUM_MAINNET]: ethereumMainnet,
  [ChainId.ETHEREUM_SEPOLIA]: ethereumSepolia,
};

// Contract addresses by chain
export const CONTRACT_ADDRESSES: Record<ChainId, { 
  predictionMarket: string; 
  gameModes: string;
}> = {
  [ChainId.SONIC_BLAZE_TESTNET]: {
    predictionMarket: '0x93012953008ef9abcb71f48c340166e8f384e985', // Replace with actual address
    gameModes: '0xc44de09ab7eefc2a9a2116e04ca1fcec86f520ff', // Replace with actual address
  },
  [ChainId.EVM_MAINNET]: {
    predictionMarket: '0x93012953008ef9abcb71f48c340166e8f384e985',
    gameModes: '0xc44de09ab7eefc2a9a2116e04ca1fcec86f520ff',
  },
  [ChainId.EVM_TESTNET]: {
    predictionMarket: '0x93012953008ef9abcb71f48c340166e8f384e985',
    gameModes: '0xc44de09ab7eefc2a9a2116e04ca1fcec86f520ff',
  },
  [ChainId.ETHEREUM_MAINNET]: {
    predictionMarket: '0x0000000000000000000000000000000000000000', // Replace with actual address if deployed
    gameModes: '0x0000000000000000000000000000000000000000', // Replace with actual address if deployed
  },
  [ChainId.ETHEREUM_SEPOLIA]: {
    predictionMarket: '0x0000000000000000000000000000000000000000', // Replace with actual address if deployed
    gameModes: '0x0000000000000000000000000000000000000000', // Replace with actual address if deployed
  },
};

// Default chain ID (Sonic Blaze Testnet)
export const DEFAULT_CHAIN_ID = ChainId.SONIC_BLAZE_TESTNET;

// Get chain by ID
export function getChainById(chainId: ChainId): Chain {
  return CHAINS[chainId] || CHAINS[DEFAULT_CHAIN_ID];
}

// Get chain by network name
export function getChainByNetwork(network: string): Chain {
  switch (network.toLowerCase()) {
    case 'sonic-blaze-testnet':
      return CHAINS[ChainId.SONIC_BLAZE_TESTNET];
    case 'evm-mainnet':
      return CHAINS[ChainId.EVM_MAINNET];
    case 'evm-testnet':
      return CHAINS[ChainId.EVM_TESTNET];
    case 'ethereum':
      return CHAINS[ChainId.ETHEREUM_MAINNET];
    case 'sepolia':
      return CHAINS[ChainId.ETHEREUM_SEPOLIA];
    default:
      return CHAINS[DEFAULT_CHAIN_ID];
  }
}

// Get contract addresses for a specific chain
export function getContractAddresses(chainId: ChainId) {
  return CONTRACT_ADDRESSES[chainId] || CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];
}

// Chain selector class for managing the current chain
export class ChainSelector {
  private static instance: ChainSelector;
  private currentChainId: ChainId = DEFAULT_CHAIN_ID;

  private constructor() {
    // Initialize with default chain
    this.currentChainId = DEFAULT_CHAIN_ID;
  }

  public static getInstance(): ChainSelector {
    if (!ChainSelector.instance) {
      ChainSelector.instance = new ChainSelector();
    }
    return ChainSelector.instance;
  }

  // Get the current chain
  public getCurrentChain(): Chain {
    return CHAINS[this.currentChainId];
  }

  // Get the current chain ID
  public getCurrentChainId(): ChainId {
    return this.currentChainId;
  }

  // Set the current chain by ID
  public setChainById(chainId: ChainId): void {
    if (CHAINS[chainId]) {
      this.currentChainId = chainId;
    }
  }

  // Set the current chain by network name
  public setChainByNetwork(network: string): void {
    const chain = getChainByNetwork(network);
    const chainId = Object.keys(CHAINS).find(
      id => CHAINS[Number(id) as ChainId] === chain
    );
    
    if (chainId) {
      this.currentChainId = Number(chainId) as ChainId;
    }
  }

  // Get contract addresses for the current chain
  public getContractAddresses() {
    return CONTRACT_ADDRESSES[this.currentChainId];
  }

  // Get the prediction market contract address
  public getPredictionMarketAddress(): string {
    return CONTRACT_ADDRESSES[this.currentChainId].predictionMarket;
  }

  // Get the game modes contract address
  public getGameModesAddress(): string {
    return CONTRACT_ADDRESSES[this.currentChainId].gameModes;
  }
}

// Export singleton instance
export const chainSelector = ChainSelector.getInstance();

// Default export
export default chainSelector;