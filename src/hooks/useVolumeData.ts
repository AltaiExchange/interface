import { useEffect, useState } from "react";
import {
  HexString,
  PriceFeed,
  PriceServiceConnection,
} from "@pythnetwork/price-service-client";

const useVolumeData = (priceId: HexString, time: number) => {
  const [priceFeed, setPriceFeed] = useState<PriceFeed | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPriceAtTime = async () => {
    try {
      setIsLoading(true);
      const connection = new PriceServiceConnection(
        "https://hermes.pyth.network"
      );

      const feed = await connection.getPriceFeed(priceId, time);
      setPriceFeed(feed);

      connection.closeWebSocket();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (priceId && time > 0) {
      fetchPriceAtTime();
    }
  }, [priceId, time]);

  return { priceFeed, isLoading };
};
export default useVolumeData;
