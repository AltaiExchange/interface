import { createPublicClient, http } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { ArbitrumSepolia } from "./chains";

export const arbitrumSepoliaClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: arbitrumSepolia,
  transport: http(ArbitrumSepolia.rpcUrl),
});
