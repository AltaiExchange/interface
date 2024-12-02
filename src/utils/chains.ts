import { TNetwork } from "@/types/network.types";
import { arbitrumSepolia } from "viem/chains";

export const ArbitrumSepolia: TNetwork = {
  chainId: arbitrumSepolia.id,
  name: arbitrumSepolia.name,
  currency: arbitrumSepolia.nativeCurrency.symbol,
  explorerUrl: "https://sepolia.arbiscan.io/",
  rpcUrl: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
  image: "/chainsLogos/arbitrum-logo.svg",
};

export const AllChains: TNetwork[] = [ArbitrumSepolia];
