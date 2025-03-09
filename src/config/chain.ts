/**
 * Chain definitions for EVM-compatible blockchains
 */
import { defineChain } from 'viem';

/**
 * Sonic Blaze Testnet chain definition
 */
export const sonicBlazeTestnet = defineChain({
  id: 57054,
  name: 'Sonic Blaze Testnet',
  network: 'sonic-blaze-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'SONIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.blaze.soniclabs.com'],
    },
    public: {
      http: ['https://rpc.blaze.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Sonic Explorer',
      url: 'https://testnet.sonicscan.org',
    },
  },
  testnet: true,
});

/**
 * EVM Mainnet chain definition
 */
export const evmMainnet = defineChain({
  id: 52014,
  name: 'EVM Mainnet',
  network: 'evm-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Token',
    symbol: 'ETN',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/electroneum/8972a361e60d38c2b495e51577a90cad43d05c7ec7b4169b89478be6944558f5'],
    },
    public: {
      http: ['https://rpc.ankr.com/electroneum/8972a361e60d38c2b495e51577a90cad43d05c7ec7b4169b89478be6944558f5'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Block Explorer',
      url: 'https://blockexplorer.electroneum.com',
    },
  },
});

/**
 * EVM Testnet chain definition
 */
export const evmTestnet = defineChain({
  id: 5201420,
  name: 'EVM Testnet',
  network: 'evm-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Token',
    symbol: 'ETN',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/electroneum_testnet/8972a361e60d38c2b495e51577a90cad43d05c7ec7b4169b89478be6944558f5'],
    },
    public: {
      http: ['https://rpc.ankr.com/electroneum_testnet/8972a361e60d38c2b495e51577a90cad43d05c7ec7b4169b89478be6944558f5'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Testnet Explorer',
      url: 'https://testnet-blockexplorer.electroneum.com',
    },
  },
  testnet: true,
});

/**
 * Ethereum Mainnet chain definition
 */
export const ethereumMainnet = defineChain({
  id: 1,
  name: 'Ethereum Mainnet',
  network: 'ethereum',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://eth.llamarpc.com'],
    },
    public: {
      http: ['https://eth.llamarpc.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
  },
});

/**
 * Ethereum Sepolia Testnet chain definition
 */
export const ethereumSepolia = defineChain({
  id: 11155111,
  name: 'Ethereum Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.org'],
    },
    public: {
      http: ['https://rpc.sepolia.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
  },
  testnet: true,
});