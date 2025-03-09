/**
 * EVM Configuration
 * 
 * Single source of truth for all EVM-related settings
 */
import { chainSelector, ChainId, CONTRACT_ADDRESSES } from './chain-selector';

// Network configuration
export const NETWORKS = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
  DEVELOPMENT: 'development',
} as const;

export type Network = typeof NETWORKS[keyof typeof NETWORKS];

// Current network based on environment
export const CURRENT_NETWORK = (process.env.NEXT_PUBLIC_EVM_NETWORK || 'testnet') as Network;

// Get the appropriate contract addresses for the current chain
const currentChainId = ChainId.SONIC_BLAZE_TESTNET; // Default to Sonic Blaze Testnet
const NETWORK_CONTRACTS = CONTRACT_ADDRESSES[currentChainId];

// Export contract addresses
export const PREDICTION_CONTRACT_ID = NETWORK_CONTRACTS.predictionMarket;
export const GAME_MODES_CONTRACT_ID = NETWORK_CONTRACTS.gameModes;

// Network configurations based on chain selector
const currentChain = chainSelector.getCurrentChain();
const NETWORK_CONFIGS = {
  [NETWORKS.MAINNET]: {
    nodeUrl: currentChain.rpcUrls.default.http[0],
    walletUrl: 'https://wallet.evm.com',
    explorerUrl: currentChain.blockExplorers?.default?.url || '',
    chainId: currentChain.id,
  },
  [NETWORKS.TESTNET]: {
    nodeUrl: currentChain.rpcUrls.default.http[0],
    walletUrl: 'https://testnet.wallet.evm.com',
    explorerUrl: currentChain.blockExplorers?.default?.url || '',
    chainId: currentChain.id,
  },
  [NETWORKS.DEVELOPMENT]: {
    nodeUrl: currentChain.rpcUrls.default.http[0],
    walletUrl: 'https://testnet.wallet.evm.com',
    explorerUrl: currentChain.blockExplorers?.default?.url || '',
    chainId: currentChain.id,
  },
};

// Get network config for the current network
export const CURRENT_NETWORK_CONFIG = NETWORK_CONFIGS[CURRENT_NETWORK] || NETWORK_CONFIGS[NETWORKS.TESTNET];

// Gas values for contract calls
export const GAS_VALUES = {
  DEFAULT: '3000000', // 3M gas units
  HIGH: '5000000',    // 5M gas units
  LOW: '1000000',     // 1M gas units
};

// Methods mapping for contracts
export const CONTRACT_METHODS = {
  predictionMarket: {
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
    'withdraw',
  ],
};

// Configuration function (maintain backward compatibility)
export const getConfig = (env: string = CURRENT_NETWORK) => {
  // Convert env string to network type
  const networkId = env === 'mainnet' ? NETWORKS.MAINNET : 
                   (env === 'testnet' ? NETWORKS.TESTNET : NETWORKS.DEVELOPMENT);
  const contracts = CONTRACT_ADDRESSES[chainSelector.getCurrentChainId()];
  const config = NETWORK_CONFIGS[networkId];
  
  return {
    networkId,
    ...config,
    predictionMarketContract: contracts.predictionMarket,
    gameModesContract: contracts.gameModes,
  };
};

// Export the complete configuration for the current network
export const CONFIG = {
  networkId: CURRENT_NETWORK,
  ...CURRENT_NETWORK_CONFIG,
  contracts: {
    predictionMarket: PREDICTION_CONTRACT_ID,
    gameModes: GAME_MODES_CONTRACT_ID,
  },
  gas: GAS_VALUES,
  methods: CONTRACT_METHODS,
  viewMethods: VIEW_METHODS,
  changeMethods: CHANGE_METHODS,
};

export default getConfig;