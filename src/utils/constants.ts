import { TMenu, TToken, TWebHeaderMenu } from "@/types/interface.types";
import { parseEther } from "viem";
import {
  GoldContract,
  SilverContract,
  UsdcContract,
  UsdtContract,
} from "./contracts";
import { ArbitrumSepolia } from "./chains";

export const HeaderWebTooltipMenu: TWebHeaderMenu[] = [
  {
    title: "Company",
    child: [
      {
        isExternal: false,
        name: "Careers",
        link: "",
      },
      {
        isExternal: false,
        name: "Blog",
        link: "",
      },
    ],
  },
  {
    title: "Protocol",
    child: [
      {
        isExternal: false,
        name: "Vote",
        link: "",
      },
      {
        isExternal: false,
        name: "Governance",
        link: "",
      },
      {
        isExternal: false,
        name: "Developers",
        link: "",
      },
    ],
  },
  {
    title: "Need help?",
    child: [
      {
        isExternal: false,
        name: "Help center",
        link: "",
      },
      {
        isExternal: false,
        name: "Contact us",
        link: "",
      },
    ],
  },
];

export const WebHeaderExploreTooltipMenu: TMenu[] = [
  {
    isExternal: false,
    name: "Tokens",
    link: "/explore?tab=tokens",
  },
  {
    isExternal: false,
    name: "Transactions",
    link: "/explore?tab=transactions",
  },
];

export const TokenList: TToken[] = [
  {
    name: "Tether",
    symbol: "USDT",
    image: "/tokensLogos/usdt-logo.svg",
    assetType: "Crypto",
    description: "",
    isBase: true,
    decimals: 6,
    chainId: 1,
    maxBuySell: 9999e6,
    priceId:
      "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
    pricePercentage: 0,
    contractAddress: "0xC8A0B166D5e5d195addAFE7B3c15bE46439a05DA",
    contract: UsdtContract,
    fdv: "",
    changeIncrease: false,

    dailyChange: "",
    lastPrice: "",
    transactions: `${ArbitrumSepolia.explorerUrl}address/0xC8A0B166D5e5d195addAFE7B3c15bE46439a05DA`,
  },
  {
    name: "USDC",
    symbol: "USDC",
    image: "/tokensLogos/usdc-logo.svg",
    assetType: "Crypto",
    description: "",
    isBase: true,
    decimals: 6,
    chainId: 1,
    maxBuySell: 9999e6,
    priceId:
      "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
    pricePercentage: 0,
    contractAddress: "0x255412E3BF55A3d8F935c23D5B4271970e68a47F",
    contract: UsdcContract,
    fdv: "",
    changeIncrease: false,

    dailyChange: "",
    lastPrice: "",
    transactions: `${ArbitrumSepolia.explorerUrl}address/0x255412E3BF55A3d8F935c23D5B4271970e68a47F`,
  },
  {
    name: "Altai Gold",
    symbol: "AXAU",
    image: "/tokensLogos/gold.svg",
    assetType: "Metal",
    description:
      "AXAU is a tokenized version of gold on the Altai platform. Each AXAU token represents 1 gram of physical gold.",
    isBase: false,
    decimals: 18,
    chainId: 1,
    maxBuySell: parseEther("10"),
    priceId:
      "0x765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2",
    pricePercentage: parseEther("31.1"),
    contractAddress: "0x5e9eb1D14238c7aE67A002Ff8ba798Fa37A4E80B",
    contract: GoldContract,
    fdv: "",
    changeIncrease: false,

    dailyChange: "",
    lastPrice: "",
    transactions: `${ArbitrumSepolia.explorerUrl}address/0x5e9eb1D14238c7aE67A002Ff8ba798Fa37A4E80B`,
  },
  {
    name: "Altai Silver",
    symbol: "AXAG",
    image: "/tokensLogos/silver.svg",
    assetType: "Metal",
    description:
      "AXAG is a tokenized version of silver on the Altai platform. Each AXAG token represents 1 gram of physical silver.",
    isBase: false,
    decimals: 18,
    chainId: 1,
    maxBuySell: parseEther("100"),
    priceId:
      "0xf2fb02c32b055c805e7238d628e5e9dadef274376114eb1f012337cabe93871e",
    pricePercentage: parseEther("31.1"),
    contractAddress: "0x6f8B3B8Eb5aFBC1A3fE6A29B63a1181b246e3E21",
    contract: SilverContract,
    fdv: "",
    changeIncrease: false,
    dailyChange: "",
    lastPrice: "",
    transactions: `${ArbitrumSepolia.explorerUrl}address/0x6f8B3B8Eb5aFBC1A3fE6A29B63a1181b246e3E21`,
  },
];
