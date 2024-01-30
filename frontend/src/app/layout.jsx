import "./globals.css";
import { Lato, Poppins, Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ReduxProvider from "../components/reduxProvider";
import { NavProvider } from "../context/nav_context";
import { WagmiConfig, createConfig, configureChains, } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  trustWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { polygonZkEvm, polygonZkEvmTestnet } from 'wagmi/chains'
import { XRPLDevnet } from './Chain.tsx'

const projectId = "274de4271228fdd69013c56274f0e688";
const { chains, publicClient } = configureChains(
  [ polygonZkEvm, polygonZkEvmTestnet, XRPLDevnet],
  [
    publicProvider()
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
    ]
  },
  {
    groupName: 'Others',
    wallets: [
      coinbaseWallet({ chains, 
        appName: 'Verxio | Decentralizing the future of work!' }),
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Verxio Protocol",
  description: "Verxio Protocol",
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter`}>
        <NavProvider>
          <ReduxProvider>
          <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider 
                theme={lightTheme({
                  accentColor: '#1570ef',
                  accentColorForeground: 'white',
                  borderRadius: 'small',
                  fontStack: 'system',
                  overlayBlur: 'small'
                },
                )} chains={chains}>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            </RainbowKitProvider>
        </WagmiConfig>

      </ReduxProvider>
  </NavProvider>

      </body>
    </html>
  );
}
