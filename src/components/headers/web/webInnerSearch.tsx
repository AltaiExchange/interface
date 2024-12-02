import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useExploreHelpers from "@/hooks/useExploreHelpers";
import { TokenList } from "@/utils/constants";
import { TToken } from "@/types/interface.types";
import { Avatar, Button } from "@nextui-org/react";
import { FormatAddressDesign } from "@/utils/helpers";

type InnerSearchProps = { filterValue: string; onClose: () => void };

const WebInnerSearch = ({ filterValue, onClose }: InnerSearchProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const hasSearchFilter = Boolean(filterValue);
  const [baseTokens, setBaseTokens] = useState<TToken[]>([]);
  const [quoteTokens, setQuoteTokens] = useState<TToken[]>([]);

  const { fetchedTokens, isLoading } = useExploreHelpers(TokenList);

  const filteredTokens = useMemo(() => {
    if (fetchedTokens) {
      let filteredItems = [...fetchedTokens];

      if (hasSearchFilter) {
        filteredItems = filteredItems.filter(
          (item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.symbol.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.contractAddress
              .toLowerCase()
              .includes(filterValue.toLowerCase())
        );
      }

      return filteredItems.reverse();
    }
  }, [hasSearchFilter, filterValue, fetchedTokens]);

  useEffect(() => {
    if (fetchedTokens) {
      const metals = fetchedTokens.filter(
        (token) => token.assetType === "Metal"
      );
      const cryptos = fetchedTokens.filter(
        (token) => token.assetType === "Crypto"
      );

      setQuoteTokens(metals);
      setBaseTokens(cryptos);
    }
  }, [fetchedTokens]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted && isLoading) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full overflow-y-scroll scrollbar-hide">
        <div className="w-full flex flex-col gap-4">
          {filteredTokens && (
            <>
              <span className="text-text-passive">Tokens</span>
            </>
          )}

          {filteredTokens &&
            filteredTokens.map((item: TToken, index: number) => (
              <div
                key={
                  "web_header_search_tokens_filter_keys_key_" + index.toString()
                }
                className="w-full"
              >
                <Button
                  radius="none"
                  disableAnimation
                  onPress={() => {
                    router.push(`/explore/${item.symbol}`);
                    onClose();
                  }}
                  className="w-full bg-transparent justify-start p-0"
                >
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Avatar src={item.image} className="bg-transparent" />
                      <div className="flex flex-col h-full items-start justify-between">
                        <span className="text-white font-bold text-md">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-white/75 text-sm">
                            {item.symbol}
                          </span>
                          <span className="text-text-passive text-xs">
                            {FormatAddressDesign(item.contractAddress)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <span className="text-white">{item.lastPrice}</span>
                      <div className="text-end text-sm">
                        <span
                          className={`${
                            item.changeIncrease
                              ? "text-custom-green"
                              : "text-custom-red"
                          }`}
                        >
                          {item.changeIncrease ? "+" : "-"}
                        </span>
                        <span
                          className={`${
                            item.changeIncrease
                              ? "text-custom-green"
                              : "text-custom-red"
                          }`}
                        >{`%${item.dailyChange}`}</span>
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            ))}
        </div>
        <div className="w-full flex flex-col gap-4">
          <span className="text-text-passive">Metals</span>
          {quoteTokens &&
            quoteTokens.map((item: TToken, index: number) => (
              <div
                key={
                  "web_header_search_tokens_quote_keys_key_" + index.toString()
                }
                className="w-full"
              >
                <Button
                  radius="none"
                  disableAnimation
                  onPress={() => {
                    router.push(`/explore/${item.symbol}`);
                    onClose();
                  }}
                  className="w-full bg-transparent justify-start p-0"
                >
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Avatar src={item.image} className="bg-transparent" />
                      <div className="flex flex-col h-full items-start justify-between">
                        <span className="text-white font-bold text-md">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-white/75 text-sm">
                            {item.symbol}
                          </span>
                          <span className="text-text-passive text-xs">
                            {FormatAddressDesign(item.contractAddress)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <span className="text-white">{item.lastPrice}</span>
                      <div className="text-end text-sm">
                        <span
                          className={`${
                            item.changeIncrease
                              ? "text-custom-green"
                              : "text-custom-red"
                          }`}
                        >
                          {item.changeIncrease ? "+" : "-"}
                        </span>
                        <span
                          className={`${
                            item.changeIncrease
                              ? "text-custom-green"
                              : "text-custom-red"
                          }`}
                        >{`%${item.dailyChange}`}</span>
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            ))}
        </div>
        <div className="w-full flex flex-col gap-4">
          <span className="text-text-passive">Crypto</span>
          {baseTokens &&
            baseTokens.map((item: TToken, index: number) => (
              <div
                key={
                  "web_header_search_tokens_quote_keys_key_" + index.toString()
                }
                className="w-full"
              >
                <Button
                  radius="none"
                  disableAnimation
                  onPress={() => {
                    router.push(`/explore/${item.symbol}`);
                    onClose();
                  }}
                  className="w-full bg-transparent justify-start p-0"
                >
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Avatar src={item.image} className="bg-transparent" />
                      <div className="flex flex-col h-full items-start justify-between">
                        <span className="text-white font-bold text-md">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-white/75 text-sm">
                            {item.symbol}
                          </span>
                          <span className="text-text-passive text-xs">
                            {FormatAddressDesign(item.contractAddress)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <span className="text-white">{item.lastPrice}</span>
                      <div className="text-end text-sm">
                        <span
                          className={`${
                            item.changeIncrease
                              ? "text-custom-green"
                              : "text-custom-red"
                          }`}
                        >
                          {item.changeIncrease ? "+" : "-"}
                        </span>
                        <span
                          className={`${
                            item.changeIncrease
                              ? "text-custom-green"
                              : "text-custom-red"
                          }`}
                        >{`%${item.dailyChange}`}</span>
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default WebInnerSearch;
