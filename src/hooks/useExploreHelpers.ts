import { useEffect, useState } from "react";
import { Format6DecimalsAsEth, getERC20TotalSupply } from "@/utils/web3";
import { PriceServiceConnection } from "@pythnetwork/price-service-client";

import { TToken } from "@/types/interface.types";
import { HelperConvertToUint } from "@/utils/helpers";
import { formatEther } from "viem";

const useExploreHelpers = (tokenList: TToken[]) => {
  const [fetchedTokens, setFetchedTokens] = useState<TToken[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fdvHelpers = (price: number, totalSupply: number) => {
    return price * totalSupply;
  };

  const getTargetDate = () => {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const utcDay = now.getUTCDay();

    const targetHour = 14; // 5 PM ET, which is 2 AM UTC
    const sunday = 0; // 0 = Sunday
    const saturday = 6; // 6 = Saturday
    const friday = 5; // 5 = Friday

    // Bugünün tarihi ve 5 PM ET saati (UTC saatine çevrildi)
    const todayAtTargetHour = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      targetHour
    );

    if (utcDay === sunday) {
      // Pazar günü ise iki gün geriye git (Cuma)
      todayAtTargetHour.setDate(todayAtTargetHour.getDate() - 2);
    } else if (utcDay === saturday) {
      // Cumartesi günü ise bir gün geriye git (Cuma)
      todayAtTargetHour.setDate(todayAtTargetHour.getDate() - 1);
    } else if (utcDay === friday && utcHour >= targetHour) {
      // Cuma günü ve saat hedef saati geçmişse bir gün geriye git
      todayAtTargetHour.setDate(todayAtTargetHour.getDate() - 1);
    } else if (now < todayAtTargetHour) {
      // Eğer şu an hedef saatten önceyse bir gün geriye git
      todayAtTargetHour.setDate(todayAtTargetHour.getDate() - 1);
    }

    return todayAtTargetHour;
  };

  const fetchTokensData = async () => {
    const connection = new PriceServiceConnection(
      "https://hermes.pyth.network"
    );
    try {
      setIsLoading(true);
      const promises = tokenList.map(async (token) => {
        const [priceFeed, totalSupply] = await Promise.all([
          connection.getLatestPriceFeeds([token.priceId]),
          getERC20TotalSupply(token.contract),
        ]);
        const price = priceFeed?.[0]?.getPriceUnchecked();
        if (!price) {
          return undefined;
        }

        let formattedPrice = HelperConvertToUint(
          Number(price.price),
          price.expo,
          token.decimals
        );

        const targetDate = getTargetDate();
        const targetTimestamp = Math.floor(targetDate.getTime() / 1000);

        const feedAtTime = await connection.getPriceFeed(
          token.priceId,
          targetTimestamp
        );

        // const feedAtTime = await connection.getLatestPriceFeeds([
        //   token.priceId,
        // ]);

        const priceAtTime = feedAtTime?.getPriceUnchecked();
        if (!priceAtTime) {
          return undefined;
        }

        const formattedDailyPrice = HelperConvertToUint(
          Number(priceAtTime.price),
          priceAtTime.expo,
          token.decimals
        );

        let percentageChange;
        if (formattedPrice >= formattedDailyPrice) {
          percentageChange =
            ((Number(formattedPrice) - Number(formattedDailyPrice)) /
              Number(formattedDailyPrice)) *
            100;
        } else {
          percentageChange =
            ((Number(formattedDailyPrice) - Number(formattedPrice)) /
              Number(formattedPrice)) *
            100;
        }

        const dailyChange = percentageChange.toFixed(2);
        const changeIncrease = percentageChange > 0;

        if (Number(token.pricePercentage) > 0) {
          formattedPrice =
            (BigInt(formattedPrice) * BigInt(1e18)) /
            BigInt(token.pricePercentage);
        }

        let expectedTotalSupply, expectedPrice;
        if (token.decimals === 18) {
          expectedTotalSupply = Number(
            formatEther(BigInt(totalSupply))
          ).toFixed(5);
          expectedPrice = Number(formatEther(formattedPrice)).toFixed(5);
        } else {
          expectedTotalSupply = Number(
            Format6DecimalsAsEth(BigInt(totalSupply))
          ).toFixed(5);
          expectedPrice = Number(Format6DecimalsAsEth(formattedPrice)).toFixed(
            5
          );
        }

        const fdv = fdvHelpers(
          Number(expectedPrice),
          Number(expectedTotalSupply)
        ).toString();
        if (!formattedPrice) {
          return undefined;
        }

        const lastPrice = `$${expectedPrice.toString()}`;

        return {
          ...token,
          fdv,
          changeIncrease,
          dailyChange,
          lastPrice,
        };
      });
      connection.closeWebSocket();
      const results = await Promise.all(promises);
      const validTokens = results.filter(
        (token): token is TToken => token !== undefined
      );
      setFetchedTokens(validTokens);
      setIsLoading(false);
    } catch (error) {
      connection.closeWebSocket();
      console.log(error);
      setIsLoading(false);
    } finally {
      connection.closeWebSocket();
    }
  };

  useEffect(() => {
    if (tokenList && tokenList.length > 0) {
      fetchTokensData();
    }
  }, [tokenList]);

  return { fetchedTokens, isLoading };
};

export default useExploreHelpers;
