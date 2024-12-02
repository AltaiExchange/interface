import { HexString } from "@pythnetwork/price-service-client";
import * as React from "react";
import { TContract } from "./network.types";

export interface SVGClassNameProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}
export interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
  fill?: string;
}

export type TMenu = {
  isExternal: boolean;
  name: string;
  link: string;
};

export type TWebHeaderMenu = {
  title: string;
  child: TMenu[];
};

export type TAssetType = "Metal" | "Crypto";

export type TToken = {
  name: string;
  symbol: string;
  image: string;
  assetType: TAssetType;
  description: string;
  isBase: boolean;
  decimals: number;
  chainId: number;
  maxBuySell: string | bigint | number;
  priceId: `0x${string}` | string | HexString;
  pricePercentage: string | bigint | number;
  contractAddress: `0x${string}` | string | HexString;
  contract: TContract;
  fdv: string;
  changeIncrease: boolean;
  dailyChange: string;
  lastPrice: string;
  transactions: string;
};

export type TPrice = {
  conf: string;
  expo: number;
  price: string;
  publishTime: number;
};

export type TPriceFeed = {
  id: string;
  emaPrice: TPrice;
  price: TPrice;
  metadata?: undefined;
  vaa?: undefined;
};

export type TSwapPricesHook = {
  sellPrice: string | number | undefined;
  buyPrice: string | number | undefined;
};
