import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';



const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum,goerli],
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
