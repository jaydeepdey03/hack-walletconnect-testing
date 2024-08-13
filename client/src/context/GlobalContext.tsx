/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext, ReactNode, useEffect, useState} from "react";

import {createWeb3Modal} from "@web3modal/wagmi/react";
import {defaultWagmiConfig} from "@web3modal/wagmi/react/config";

import {WagmiProvider} from "wagmi";
import {baseSepolia} from "wagmi/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const GlobalContext = createContext({
  ContractAddress: "",
});

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const metadata = {
  name: "my-projects",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// const chains = [sepolia] as const;

const config = defaultWagmiConfig({
  chains: [baseSepolia],
  projectId,
  metadata,
  auth: {
    email: true, // default to true
    socials: ["google"],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

const ContractAddress = "0x94Da51b64Dc2a214415b9F97EAdF2e0d76c6b1ee" as string;

export function GlobalContextProvider({children}: {children: ReactNode}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <GlobalContext.Provider value={{ContractAddress}}>
          {children}
        </GlobalContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
