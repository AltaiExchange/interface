import { Contract, JsonRpcProvider, BrowserProvider } from "ethers";
import { arbitrumSepoliaClient } from "./clients";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import { ethers } from "ethers";

import { getContract } from "viem";

export function GetContractAt(contract) {
  return new Contract(
    contract.address,
    contract.abi,
    new JsonRpcProvider(contract.rpcUrl)
  );
}
export function Format6DecimalsAsEth(value) {
  const bigValue = ethers.parseUnits(value.toString(), 6);
  const multipliedValue = bigValue / ethers.toBigInt(1e6);
  const formattedValue = ethers.formatUnits(multipliedValue, 6);
  return formattedValue;
}

export async function GetSigner(wallet) {
  return new BrowserProvider(wallet).getSigner();
}

export const selectedClient = arbitrumSepoliaClient;

export async function getUpdatePriceFeedData(priceIds) {
  try {
    if (!priceIds) {
      return;
    }
    const connection = new EvmPriceServiceConnection(
      "https://hermes.pyth.network"
    );
    const pythUpdateData = await connection.getPriceFeedsUpdateData(priceIds);
    connection.closeWebSocket();
    return pythUpdateData;
  } catch (error) {
    console.log("getUpdatePriceFeedData : ", error);
  }
}

export async function getERC20Balance(contractInformation, user) {
  let balance = "0";
  try {
    if (contractInformation && user) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.balanceOf([user]);
      balance = res;
    }
    return balance;
  } catch (error) {
    console.log("getERC20Balance : ", error);
    return balance;
  }
}

export async function getERC20TotalSupply(contractInformation) {
  let totalSupply = "0";
  try {
    if (contractInformation) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.totalSupply();
      totalSupply = res;
    }
    return totalSupply;
  } catch (error) {
    console.log("getERC20TotalSupply : ", error);
    return totalSupply;
  }
}

export async function getERC20Allowance(contractInformation, user, to) {
  let allowance = "0";
  try {
    if (contractInformation && user) {
      const contract = getContract({
        address: contractInformation.address,
        abi: contractInformation.abi,
        client: {
          public: selectedClient,
        },
      });
      const res = await contract.read.allowance([user, to]);
      allowance = res;
    }
    return allowance;
  } catch (error) {
    console.log("getERC20Allowance : ", error);
    return allowance;
  }
}
