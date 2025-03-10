/**
 * EVM Configuration
 */
import { chainSelector } from './chain-selector';
import type { ChainConfig } from './chain-selector';

// Network configuration
export const NETWORKS = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
  DEVELOPMENT: 'development',
} as const;

export type Network = typeof NETWORKS[keyof typeof NETWORKS];

// Current network based on environment
export const CURRENT_NETWORK = (process.env.NEXT_PUBLIC_EVM_NETWORK || 'testnet') as Network;

// Re-export the Chain IDs from the chain selector
export enum ChainId {
  ETHEREUM_MAINNET = 1,
  ETHEREUM_SEPOLIA = 11155111,
  ARBITRUM_SEPOLIA = 421614,
  SONIC_BLAZE_TESTNET = 57054 // Sonic Blaze Testnet chain ID
}

// Contract addresses by chain
export const CONTRACT_ADDRESSES: Record<number, { predictionMarket: string; gameModes: string }> = {
  [ChainId.ETHEREUM_SEPOLIA]: {
    predictionMarket: "0x1234567890123456789012345678901234567890",
    gameModes: "0x0987654321098765432109876543210987654321",
  },
  [ChainId.ARBITRUM_SEPOLIA]: {
    predictionMarket: "0xabcdef1234567890abcdef1234567890abcdef12",
    gameModes: "0x123456abcdef7890123456abcdef7890123456ab",
  },
  [ChainId.SONIC_BLAZE_TESTNET]: {
    predictionMarket: "0xC44DE09ab7eEFC2a9a2116E04ca1fcEc86F520fF", // Updated with the actual BaultroGames contract address
    gameModes: "0xC44DE09ab7eEFC2a9a2116E04ca1fcEc86F520fF", // Updated with the actual BaultroGames contract address
  }
};

// Get the current chain from the chain selector
const currentChain = chainSelector.getActiveChain();

// Network configurations based on chain selector
const NETWORK_CONFIGS = {
  [NETWORKS.MAINNET]: {
    nodeUrl: currentChain.rpcUrl,
    walletUrl: 'https://wallet.evm.com',
    explorerUrl: currentChain.blockExplorerUrl,
    chainId: currentChain.chainId,
  },
  [NETWORKS.TESTNET]: {
    nodeUrl: currentChain.rpcUrl,
    walletUrl: 'https://testnet.wallet.evm.com',
    explorerUrl: currentChain.blockExplorerUrl,
    chainId: currentChain.chainId,
  },
  [NETWORKS.DEVELOPMENT]: {
    nodeUrl: currentChain.rpcUrl,
    walletUrl: 'https://testnet.wallet.evm.com',
    explorerUrl: currentChain.blockExplorerUrl,
    chainId: currentChain.chainId,
  },
};

// Get network config for the current network
export const CURRENT_NETWORK_CONFIG = NETWORK_CONFIGS[CURRENT_NETWORK] || NETWORK_CONFIGS[NETWORKS.TESTNET];

// Gas limits for different types of operations
export const GAS_LIMITS = {
  DEFAULT: '3000000', // 3M gas units
  HIGH: '5000000',    // 5M gas units
  LOW: '1000000',     // 1M gas units
};

// Methods mapping for contracts
export const CONTRACT_METHODS = {
  predictionMarket: {
    // Add BaultroGames functions to predictionMarket for Sonic Blaze Testnet
    createMatch: 'createMatch',
    joinMatch: 'joinMatch',
    endMatch: 'endMatch',
    createRaid: 'createRaid',
    attemptRaid: 'attemptRaid',
    completeRaid: 'completeRaid',
    getMatch: 'getMatch',
    getMatches: 'getMatches',
    getRaid: 'getRaid',
    getRaids: 'getRaids',
    // Keep original predictionMarket methods for backward compatibility
    createPrediction: 'createPrediction',
    placeBet: 'placeBet',
    resolvePrediction: 'resolvePrediction',
    claimWinnings: 'claimWinnings',
    executeCrossChainBet: 'executeCrossChainBet',
    getPrediction: 'getPrediction',
    getPredictions: 'getPredictions',
    getPredictionsCount: 'getPredictionsCount',
    getBet: 'getBet',
    getIntegrationContracts: 'getIntegrationContracts',
  },
  gameModes: {
    createMatch: 'createMatch',
    joinMatch: 'joinMatch',
    endMatch: 'endMatch',
    createRaid: 'createRaid',
    attemptRaid: 'attemptRaid',
    completeRaid: 'completeRaid',
    getMatch: 'getMatch',
    getMatches: 'getMatches',
    getRaid: 'getRaid',
    getRaids: 'getRaids',
  },
};

// View methods that don't require signing
export const VIEW_METHODS = {
  predictionMarket: [
    // Add BaultroGames view methods
    'getMatch',
    'getMatches',
    'getRaid',
    'getRaids',
    // Keep original view methods
    'getPrediction',
    'getPredictions',
    'getPredictionsCount',
    'getBet',
    'getCrossChainBet',
    'getPlatformFee',
    'getTotalStake',
    'getIntegrationContracts',
  ],
  gameModes: [
    'getMatch',
    'getMatches',
    'getRaid',
    'getRaids',
  ],
};

// Change methods that require signing
export const CHANGE_METHODS = {
  predictionMarket: [
    // Add BaultroGames methods that require signing
    'createMatch',
    'joinMatch',
    'endMatch',
    'createRaid',
    'attemptRaid',
    'completeRaid',
    // Keep original methods
    'createPrediction',
    'placeBet',
    'resolvePrediction',
    'claimWinnings',
    'executeCrossChainBet',
    'updateIntegrations',
    'withdraw',
  ],
  gameModes: [
    'createMatch',
    'joinMatch',
    'endMatch',
    'createRaid',
    'attemptRaid',
    'completeRaid',
    'claimReward',
  ],
};

/**
 * Get current EVM configuration
 */
export const getConfig = (): ChainConfig => {
  return chainSelector.getActiveChain();
};

/**
 * Get chain ID
 */
export const getChainId = (): number => {
  return chainSelector.getActiveChainId();
};

/**
 * Get prediction market contract address
 */
export const getPredictionMarketAddress = (): string => {
  return chainSelector.getPredictionMarketAddress();
};

/**
 * Get game modes contract address
 */
export const getGameModesAddress = (): string => {
  return chainSelector.getGameModesAddress();
};

// Export the complete configuration for the current network
export const CONFIG = {
  networkId: CURRENT_NETWORK,
  ...CURRENT_NETWORK_CONFIG,
  contracts: {
    predictionMarket: CONTRACT_ADDRESSES[currentChain.chainId]?.predictionMarket || "",
    gameModes: CONTRACT_ADDRESSES[currentChain.chainId]?.gameModes || "",
  },
  gas: GAS_LIMITS,
  methods: CONTRACT_METHODS,
  viewMethods: VIEW_METHODS,
  changeMethods: CHANGE_METHODS,
};

export default getConfig;