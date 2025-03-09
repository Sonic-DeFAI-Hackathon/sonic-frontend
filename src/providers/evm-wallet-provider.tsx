"use client";

/**
 * EVM Wallet Provider
 * Provides wallet functionality to the application using
 * the EVM wallet mechanism
 */
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { TransactionResponse } from '@/config/evm-wallet';
import { PREDICTION_CONTRACT_ID } from '@/config/evm';
import { evmService } from '@/services/evm-service';
import { TransactionType } from '@/schemas/blockchain';

// Define the context state interface
interface EVMWalletContextState {
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  callViewMethod: <T>(
    methodName: string, 
    args?: unknown[], 
    contractId?: string
  ) => Promise<T>;
  callMethod: (
    methodName: string, 
    args?: unknown[], 
    value?: string, 
    contractId?: string
  ) => Promise<TransactionResponse>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

// Create the context with default values
const EVMWalletContext = createContext<EVMWalletContextState>({
  address: null,
  isConnected: false,
  isLoading: true,
  callViewMethod: async () => {
    throw new Error('EVMWalletContext not initialized');
  },
  callMethod: async () => {
    throw new Error('EVMWalletContext not initialized');
  },
  signIn: async () => false,
  signOut: async () => false,
});

// Provider props interface
interface EVMWalletProviderProps {
  children: ReactNode;
}

// Provider component
export function EVMWalletProvider({ children }: EVMWalletProviderProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize wallet on component mount
  useEffect(() => {
    const initWallet = async () => {
      try {
        setIsLoading(true);
        
        // Check if wallet is already connected
        if (evmService.isWalletConnected()) {
          const walletAddress = evmService.getConnectedWallet();
          if (walletAddress) {
            setAddress(walletAddress);
            setIsConnected(true);
          }
        }
      } catch (error) {
        console.error('Error initializing EVM wallet:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initWallet();
  }, []);

  // Call a view method on a contract
  const callViewMethod = async <T,>(
    methodName: string,
    args: unknown[] = [],
    contractId: string = PREDICTION_CONTRACT_ID
  ): Promise<T> => {
    try {
      // Convert args array to object if needed
      const argsObj = Array.isArray(args) ? { args } : args;
      
      // Call the view method through the service
      return await evmService.callViewMethod<T>(methodName, argsObj, contractId);
    } catch (error) {
      console.error(`Error calling view method ${methodName}:`, error);
      throw error;
    }
  };

  // Call a method on a contract that requires signing
  const callMethod = async (
    methodName: string,
    args: unknown[] = [],
    value: string = '0',
    contractId: string = PREDICTION_CONTRACT_ID
  ): Promise<TransactionResponse> => {
    try {
      if (!isConnected) {
        throw new Error('Wallet not connected');
      }

      // Convert args array to object if needed
      const argsObj = Array.isArray(args) ? { args } : args;
      
      // Determine transaction type based on method name
      let txType = TransactionType.UNKNOWN;
      if (methodName.includes('create')) {
        txType = TransactionType.GAME_CREATE;
      } else if (methodName.includes('bet') || methodName.includes('attempt')) {
        txType = TransactionType.GAME_BET;
      } else if (methodName.includes('join')) {
        txType = TransactionType.GAME_JOIN;
      } else if (methodName.includes('end') || methodName.includes('complete')) {
        txType = TransactionType.GAME_END;
      }
      
      // Execute the transaction through the service
      const result = await evmService.executeTransaction({
        type: txType,
        method: methodName,
        args: argsObj,
        deposit: value,
        contract: contractId,
      });

      return {
        hash: result.txHash,
        status: result.status,
        success: result.status === 'success',
      };
    } catch (error) {
      console.error(`Error calling method ${methodName}:`, error);
      return {
        hash: '',
        status: 'failure',
        success: false,
        errorMessage: error instanceof Error ? error.message : String(error),
      };
    }
  };

  // Sign in to wallet
  const signIn = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Connect wallet through the service
      const success = await evmService.connectWallet();
      
      if (success) {
        const walletAddress = evmService.getConnectedWallet();
        if (walletAddress) {
          setAddress(walletAddress);
          setIsConnected(true);
          
          // Log successful connection
          console.log(`Connected to EVM wallet: ${walletAddress}`);
          
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error signing in to EVM wallet:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out from wallet
  const signOut = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Disconnect wallet through the service
      const success = await evmService.disconnectWallet();
      
      if (success) {
        setAddress(null);
        setIsConnected(false);
        
        // Log successful disconnection
        console.log('Disconnected from EVM wallet');
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error signing out from EVM wallet:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value: EVMWalletContextState = {
    address,
    isConnected,
    isLoading,
    callViewMethod,
    callMethod,
    signIn,
    signOut,
  };

  return (
    <EVMWalletContext.Provider value={value}>
      {children}
    </EVMWalletContext.Provider>
  );
}

// Custom hook to use the EVM wallet context
export function useEVMWallet() {
  const context = useContext(EVMWalletContext);
  
  if (context === undefined) {
    throw new Error('useEVMWallet must be used within an EVMWalletProvider');
  }
  
  return context;
}

/**
 * Generic wallet hook for application use
 * This is the recommended hook to use throughout the application
 */
export function useWallet() {
  return useEVMWallet();
}
