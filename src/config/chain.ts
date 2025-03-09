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