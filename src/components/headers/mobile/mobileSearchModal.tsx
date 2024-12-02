import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";

import { TBasicModalProps1 } from "@/types/modal.types";
import useExploreHelpers from "@/hooks/useExploreHelpers";
import { TokenList } from "@/utils/constants";
import { useRouter } from "next/router";
import { CloseIconThin, SearchBasicIcon } from "@/components/ui/icons";
import { TToken } from "@/types/interface.types";
import { FormatAddressDesign } from "@/utils/helpers";

// MobileSearchModalHeader modal update set --g v-3 glp-2

const MobileSearchModalHeader: React.FC<TBasicModalProps1> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [filterValue, setFilterValue] = useState<string>("");
  const hasSearchFilter = Boolean(filterValue);
  const [baseTokens, setBaseTokens] = useState<TToken[]>([]);
  const [quoteTokens, setQuoteTokens] = useState<TToken[]>([]);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

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
      <Modal
        hideCloseButton={true}
        backdrop="opaque"
        size="full"
        placement="bottom"
        scrollBehavior="inside"
        radius="none"
        isOpen={isOpen}
        style={{
          margin: 0,
          padding: 0,
        }}
        onClose={onClose}
        classNames={{
          body: "py-6",
          base: "bg-background h-full",
        }}
      >
        <ModalContent>
          <>
            <ModalBody className="flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
              <div className="flex justify-between w-full items-center">
                <Input
                  radius="full"
                  color="primary"
                  placeholder="Search tokens"
                  value={filterValue}
                  onClear={() => setFilterValue("")}
                  onValueChange={onSearchChange}
                  startContent={
                    <SearchBasicIcon className={"text-text-passive"} />
                  }
                  classNames={{
                    input:
                      "bg-upper-background group-data-[focus=true]:bg-background text-white placeholder:text-text-passive text-md text-sm",
                    inputWrapper:
                      "bg-upper-background data-[hover=true]:bg-upper-background group-data-[focus=true]:bg-background border border-border",
                    innerWrapper:
                      "bg-upper-background group-data-[focus=true]:bg-background text-white",
                  }}
                  className="w-[80%]"
                />
                <Button
                  isIconOnly
                  disableAnimation
                  radius="none"
                  onPress={() => onClose()}
                  startContent={<CloseIconThin fill="white" />}
                  className="bg-transparent p-0"
                />
              </div>
              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-5">
                  <span className="text-text-passive">Tokens</span>
                  {filteredTokens &&
                    filteredTokens.map((item: TToken, index: number) => (
                      <div
                        key={
                          "mobile_search_tokens_keys_key_" + index.toString()
                        }
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
                              <Avatar
                                src={item.image}
                                className="bg-transparent"
                              />
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
                              <span className="text-white">
                                {item.lastPrice}
                              </span>
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
                <div className="flex flex-col gap-5">
                  <span className="text-text-passive">Metals</span>
                  {quoteTokens &&
                    quoteTokens.map((item: TToken, index: number) => (
                      <div
                        key={
                          "mobile_search_tokens_metals_keys_key_" +
                          index.toString()
                        }
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
                              <Avatar
                                src={item.image}
                                className="bg-transparent"
                              />
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
                              <span className="text-white">
                                {item.lastPrice}
                              </span>
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
                <div className="flex flex-col gap-5">
                  <span className="text-text-passive">Crypto</span>
                  {baseTokens &&
                    baseTokens.map((item: TToken, index: number) => (
                      <div
                        key={
                          "mobile_search_tokens_base_keys_key_" +
                          index.toString()
                        }
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
                              <Avatar
                                src={item.image}
                                className="bg-transparent"
                              />
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
                              <span className="text-white">
                                {item.lastPrice}
                              </span>
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
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MobileSearchModalHeader;
