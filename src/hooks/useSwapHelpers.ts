import { useEffect, useState } from "react";
import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import { HelperConvertToUint, HelperDecimalsConverter } from "@/utils/helpers";

import { TSwapPricesHook, TToken } from "@/types/interface.types";

const useSwapHelpers = (
  sellToken: TToken,
  buyToken: TToken,
  sellAmount: string
) => {
  const calculateBuyAmount = (
    sAmount: number,
    formattedBasePrice: bigint,
    formattedQuotePrice: bigint,
    baseToken: TToken,
    quoteToken: TToken
  ): number => {
    const aBase =
      (Number(sAmount) * Number(formattedBasePrice)) /
      Number(10 ** baseToken.decimals);
    let qAmount = (aBase * Number(1e18)) / Number(formattedQuotePrice);
    qAmount = HelperDecimalsConverter(qAmount, 18, quoteToken.decimals);

    return qAmount;
  };

  const calculateSellAmount = (
    sAmount: number,
    formattedBasePrice: bigint,
    formattedQuotePrice: bigint,
    baseToken: TToken,
    quoteToken: TToken
  ): number => {
    const aQuote =
      (Number(sAmount) * Number(formattedQuotePrice)) /
      Number(10 ** quoteToken.decimals);
    let bAmount = (aQuote * Number(1e18)) / Number(formattedBasePrice);
    bAmount = HelperDecimalsConverter(bAmount, 18, baseToken.decimals);
    return bAmount;
  };

  const [prices, setPrices] = useState<TSwapPricesHook>({
    sellPrice: "",
    buyPrice: "",
  });
  const [buyAmount, setBuyAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPrice = async () => {
    const connection = new PriceServiceConnection(
      "https://hermes.pyth.network"
    );
    try {
      setLoading(true);
      const isBuy = sellToken.isBase;

      const baseToken = isBuy ? sellToken : buyToken;
      const quoteToken = isBuy ? buyToken : sellToken;
      const sAmount = isBuy
        ? Number(sellAmount) * Number(10 ** baseToken.decimals)
        : Number(sellAmount) * Number(10 ** quoteToken.decimals);

      const [basePriceFeed, quotePriceFeed] = await Promise.all([
        connection.getLatestPriceFeeds([baseToken.priceId]),
        connection.getLatestPriceFeeds([quoteToken.priceId]),
      ]);

      const basePrice = basePriceFeed?.[0]?.getPriceUnchecked();
      if (!basePrice) {
        console.error("Base token price not found.");
        return;
      }
      const quotePrice = quotePriceFeed?.[0]?.getPriceUnchecked();
      if (!quotePrice) {
        console.error("Quote token price not found.");
        return;
      }
      connection.closeWebSocket();

      const formattedBasePrice = HelperConvertToUint(
        Number(basePrice.price),
        basePrice.expo,
        18
      );

      let formattedQuotePrice = Number(
        HelperConvertToUint(Number(quotePrice.price), quotePrice.expo, 18)
      );
      if (Number(quoteToken.pricePercentage) > 0) {
        formattedQuotePrice =
          (Number(BigInt(formattedQuotePrice)) * 1e18) /
          Number(BigInt(quoteToken.pricePercentage));
      }

      if (!isBuy) {
        const expectedAmount = calculateSellAmount(
          sAmount,
          formattedBasePrice,
          BigInt(formattedQuotePrice),
          baseToken,
          quoteToken
        );
        const fee = (expectedAmount * Number(1)) / Number(1000);
        const amount = expectedAmount - fee;
        setPrices({
          buyPrice: expectedAmount.toString(),
          sellPrice: amount.toString(),
        });

        setBuyAmount(amount.toString());
      } else {
        const expectedAmount = calculateBuyAmount(
          sAmount,
          formattedBasePrice,
          BigInt(formattedQuotePrice),
          baseToken,
          quoteToken
        );
        const fee = (sAmount * Number(1)) / Number(1000);
        const amount = sAmount - fee;
        setPrices({
          buyPrice: sAmount.toString(),
          sellPrice: amount.toString(),
        });
        setBuyAmount(expectedAmount.toString());
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      sellToken &&
      sellToken.decimals > 0 &&
      buyToken &&
      buyToken.decimals > 0 &&
      sellAmount &&
      Number(sellAmount) > 0
    ) {
      fetchPrice();
    } else {
      setLoading(false);
    }
  }, [sellToken, buyToken, sellAmount]);

  return { prices, buyAmount, loading };
};
export default useSwapHelpers;
