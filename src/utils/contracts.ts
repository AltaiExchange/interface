import DiamondAbi from "./abis/Diamond.json";
import ERC20Abi from "./abis/ERC20.json";
import { ArbitrumSepolia } from "./chains";

import { TContract } from "@/types/network.types";

export const DiamondContractAddress =
  "0xA9783d0151d83eC148332A35e2a501eeeBab552A";
export const UsdtContractAddress = "0xC8A0B166D5e5d195addAFE7B3c15bE46439a05DA";
export const UsdcContractAddress = "0x255412E3BF55A3d8F935c23D5B4271970e68a47F";
export const GoldContractAddress = "0x5e9eb1D14238c7aE67A002Ff8ba798Fa37A4E80B";
export const SilverContractAddress =
  "0x6f8B3B8Eb5aFBC1A3fE6A29B63a1181b246e3E21";

export const DiamondContract: TContract = {
  address: DiamondContractAddress,
  abi: DiamondAbi.abi,
  chainId: ArbitrumSepolia.chainId,
  rpcUrl: ArbitrumSepolia.rpcUrl,
};

export const UsdtContract: TContract = {
  address: UsdtContractAddress,
  abi: ERC20Abi.abi,
  chainId: ArbitrumSepolia.chainId,
  rpcUrl: ArbitrumSepolia.rpcUrl,
};

export const UsdcContract: TContract = {
  address: UsdcContractAddress,
  abi: ERC20Abi.abi,
  chainId: ArbitrumSepolia.chainId,
  rpcUrl: ArbitrumSepolia.rpcUrl,
};

export const GoldContract: TContract = {
  address: GoldContractAddress,
  abi: ERC20Abi.abi,
  chainId: ArbitrumSepolia.chainId,
  rpcUrl: ArbitrumSepolia.rpcUrl,
};

export const SilverContract: TContract = {
  address: SilverContractAddress,
  abi: ERC20Abi.abi,
  chainId: ArbitrumSepolia.chainId,
  rpcUrl: ArbitrumSepolia.rpcUrl,
};
