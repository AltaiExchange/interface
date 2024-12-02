"use client";

import { ReactNode } from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { AllChains, ArbitrumSepolia } from "@/utils/chains";

const projectId = "02833fd0f74334d414c8516a949b0032";
const metadata = {
  name: "X SWAP",
  description: "X Swap Example Interface Custom Swap Routers",
  url: "http://localhost:3000",
  icons: [""],
};

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
  }),
  chains: AllChains,
  defaultChain: ArbitrumSepolia,
  chainImages: {
    421614: ArbitrumSepolia.image,
  },
  projectId,
  metadata,
  enableAnalytics: true,
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // Metamask
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // Trust
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // Coinbase
    "e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b", // WalletConnect
    "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4", // Binance
  ],
  allWallets: "SHOW",
  enableOnramp: true,
  themeMode: "dark",

  themeVariables: {
    "--w3m-color-mix": "#1B1B1B",
    "--w3m-color-mix-strength": 3,
    "--w3m-accent": "#AE22B0 ",
    "--w3m-z-index": 999999999,
    "--w3m-border-radius-master": "1px",
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return children;
}
