import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai, polygonZkEvmTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const Polygon_zkEVM = {
  id: 1442,
  name: 'Polygon zkEVM Testnet',
  network: 'testnet',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'zkEVM',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://rpc.public.zkevm-test.net/',
  },
  blockExplorers: {
    default: { name: 'zkevm', url: 'https://explorer.public.zkevm-test.net/' },
    etherscan: { name: 'zkevm', url: 'https://explorer.public.zkevm-test.net/' },
  },
  testnet: true,
};
​
const { provider, chains } = configureChains(
  [Polygon_zkEVM],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);
​
const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});
​
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  // webSocketProvider,
});


const { chains, provider } = configureChains(
  [polygonZkEvmTestnet],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Super Stable Token',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


export default function App({ Component, pageProps }) {

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>


  )
}
