import { HexString } from "@pythnetwork/price-service-client";

export type TNetwork = {
  chainId: number;
  name: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
  image: string;
};

export type TContract = {
  address: `0x${string}` | string | HexString;
  abi: object[];
  chainId: number;
  rpcUrl: string;
};
