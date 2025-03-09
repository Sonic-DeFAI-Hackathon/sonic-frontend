/**
 * Blockchain schemas and types
 */

// Chain types supported by the application
export enum ChainType {
  EVM = 'evm',
}

// Transaction status
export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

// Transaction types
export enum TransactionType {
  // Prediction market transactions
  PREDICTION_CREATE = 'prediction_create',
  PREDICTION_BET = 'prediction_bet',
  PREDICTION_RESOLVE = 'prediction_resolve',
  PREDICTION_CLAIM = 'prediction_claim',
  
  // Game transactions
  GAME_CREATE = 'game_create',
  GAME_JOIN = 'game_join',
  GAME_END = 'game_end',
  GAME_BET = 'game_bet',
  
  // Cross-chain transactions
  CROSS_CHAIN_SWAP = 'cross_chain_swap',
  CROSS_CHAIN_BET = 'cross_chain_bet',
  
  // Other transactions
  TRANSFER = 'transfer',
  UNKNOWN = 'unknown',
}

// Blockchain transaction request
export interface BlockchainTransactionRequest<T = unknown> {
  type: TransactionType;
  contract?: string;
  method?: string;
  args?: T;
  deposit?: string;
  gas?: string;
  callbackUrl?: string;
}

// Blockchain transaction response
export interface BlockchainTransactionResponse {
  txHash: string;
  status: TransactionStatus;
  type: TransactionType;
  blockHeight: number;
  gasUsed: string;
  timestamp: number;
  data: unknown | null;
}

// Blockchain transaction with additional metadata
export interface BlockchainTransaction extends BlockchainTransactionResponse {
  id: string;
  userId: string;
  chain: ChainType;
  contractAddress?: string;
  methodName?: string;
  args?: string;
  deposit?: string;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blockchain wallet
export interface BlockchainWallet {
  id: string;
  userId: string;
  address: string;
  chain: ChainType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Blockchain contract
export interface BlockchainContract {
  id: string;
  name: string;
  address: string;
  chain: ChainType;
  abi: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blockchain event
export interface BlockchainEvent {
  id: string;
  contractAddress: string;
  eventName: string;
  blockNumber: number;
  transactionHash: string;
  logIndex: number;
  data: string;
  chain: ChainType;
  processed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Blockchain webhook
export interface BlockchainWebhook {
  id: string;
  userId: string;
  url: string;
  events: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Blockchain service interface
export interface IBlockchainService {
  connectWallet(): Promise<boolean>;
  disconnectWallet(): Promise<boolean>;
  executeTransaction<T = unknown>(request: BlockchainTransactionRequest<T>): Promise<BlockchainTransactionResponse>;
  callViewMethod<T = unknown>(methodName: string, args?: any, contractName?: string): Promise<T>;
  isWalletConnected(): boolean;
  getConnectedWallet(): string | null;
  getConnectionStatus(): 'connected' | 'disconnected' | 'connecting';
  getProvider(): string;
}