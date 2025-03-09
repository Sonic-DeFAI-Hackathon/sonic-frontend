Viem is a TypeScript interface designed to facilitate interactions with the Ethereum blockchain, offering developers a modular, lightweight, and type-safe set of tools for building reliable applications and libraries. citeturn0search0

**Key Features:**

- **Modular Design:** Viem's composable modules enable developers to construct applications and libraries efficiently, optimizing for tree-shaking and reducing bundle sizes.

- **Performance Optimization:** Its architecture is tailored for high performance, providing efficient abstractions over the JSON-RPC API and native support for browser BigInt, eliminating the need for large BigNumber libraries.

- **TypeScript Integration:** Viem offers extensive TypeScript typing, allowing for type inference from ABIs and EIP-712 Typed Data, enhancing code reliability and developer experience.

- **Smart Contract Interaction:** It provides first-class APIs for seamless smart contract interactions, including utilities for ABI encoding, decoding, and inspection.

- **Wallet Compatibility:** Developers can integrate various wallets such as Browser Extension wallets, WalletConnect, or Private Key Wallets, offering flexibility in account management.

**Getting Started Example:**


```typescript
// 1. Import modules.
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

// 2. Set up your client with desired chain & transport.
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// 3. Consume an action!
const blockNumber = await client.getBlockNumber();
```


**Recent Updates:**

Viem 2.0 introduced significant enhancements, including first-class support for the OP Stack, which encompasses low-level OP Stack actions and compatibility with the Optimism ecosystem. citeturn0search3

**Integration with Wagmi Core:**

Wagmi Core v2 has been redesigned to align closely with Viem, transforming Wagmi into a lightweight wrapper around Viem. This integration brings multichain support and improved account management. Developers migrating from Wagmi v1 to v2 should consult the migration guide for detailed information on breaking changes and new features. citeturn0search4

In Viem 2.0, the `createWalletClient` function enables interactions with Ethereum accounts, allowing for operations such as retrieving account addresses, sending transactions, and signing messages. citeturn0search0

**Setting Up a Wallet Client:**

1. **For JSON-RPC Accounts (e.g., Browser Extension Wallets):**

   To interact with wallets like MetaMask, you can set up a Wallet Client using the `custom` transport:

   ```typescript
   import { createWalletClient, custom } from 'viem';
   import { mainnet } from 'viem/chains';

   const client = createWalletClient({
     chain: mainnet,
     transport: custom(window.ethereum),
   });
   ```


   After initializing the client, retrieve the account address:

   ```typescript
   const [address] = await client.getAddresses();
   ```


   You can then perform actions like sending transactions:

   ```typescript
   import { parseEther } from 'viem';

   const hash = await client.sendTransaction({
     account: address,
     to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
     value: parseEther('0.001'),
   });
   ```


2. **For Local Accounts (e.g., Private Key Wallets):**

   To manage accounts locally, instantiate a Wallet Client with the `http` transport and provide the private key:

   ```typescript
   import { createWalletClient, http } from 'viem';
   import { privateKeyToAccount } from 'viem/accounts';
   import { mainnet } from 'viem/chains';

   const account = privateKeyToAccount('0x...');

   const client = createWalletClient({
     account,
     chain: mainnet,
     transport: http(),
   });

   const hash = await client.sendTransaction({
     account,
     to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
     value: parseEther('0.001'),
   });
   ```


**Important Considerations:**

- **Public Actions:** Wallet Clients are primarily designed for wallet-specific actions and may not support public actions like `eth_call` or `eth_getLogs`. To perform such actions, it's recommended to use a Public Client. citeturn0search1

- **Extending Wallet Clients:** If you need to perform both wallet and public actions, you can extend a Wallet Client with public actions:

   ```typescript
   import { createWalletClient, http, publicActions } from 'viem';
   import { privateKeyToAccount } from 'viem/accounts';
   import { mainnet } from 'viem/chains';

   const account = privateKeyToAccount('0x...');

   const client = createWalletClient({
     account,
     chain: mainnet,
     transport: http(),
   }).extend(publicActions);

   const blockNumber = await client.getBlockNumber();
   ```


For comprehensive details and advanced configurations, refer to the [Viem Wallet Client documentation](https://viem.sh/docs/clients/wallet.html). 