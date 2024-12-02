import React, { useCallback, useEffect, useState } from "react";
import useTokenFilter from "@/hooks/useTokenFilter";
import { Avatar, Button, Input } from "@nextui-org/react";
import { ArrowDownIconThin, ChevronDownIconThin } from "../ui/icons";

import { TToken } from "@/types/interface.types";
import WebSearchModal from "./web/webSearchModal";
import useSwapHelpers from "@/hooks/useSwapHelpers";
import { FormatDecimalsAsEth } from "@/utils/helpers";
import MobileSearchModal from "./mobile/mobileSearchModal";

import { formatEther } from "viem";
import { useRouter } from "next/router";

export default function SwapsHome() {
  const router = useRouter();
  const { baseTokens, quoteTokens } = useTokenFilter();

  const [mounted, setMounted] = useState<boolean>(false);
  const [tokenIn, setTokenIn] = useState<TToken>();
  const [tokenOut, setTokenOut] = useState<TToken>();
  const [changeCount, setChangeCount] = useState<number>(0);

  const [tokenInInputValue, setTokenInInputValue] = useState<string>("");
  const [tokenOutInputValue, setTokenOutInputValue] = useState<string>("");

  const { prices, buyAmount, loading } = useSwapHelpers(
    tokenIn ? tokenIn : ({} as TToken),
    tokenOut ? tokenOut : ({} as TToken),
    tokenInInputValue
  );

  const [tokenInModalWebIsOpen, setTokenInModalWebIsOpen] =
    useState<boolean>(false);
  const [tokenOutModalWebIsOpen, setTokenOutModalWebIsOpen] =
    useState<boolean>(false);
  const [tokenInModalMobileIsOpen, setTokenInModalMobileIsOpen] =
    useState<boolean>(false);
  const [tokenOutModalMobileIsOpen, setTokenOutModalMobileIsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setTokenIn(baseTokens[0]);
    setMounted(true);
  }, [baseTokens]);

  const onInputTokenIn = useCallback((value: string) => {
    if (value) {
      const newValue = value.replace(",", ".");
      if (/[^0-9.]/.test(newValue)) {
        return;
      }
      if (
        tokenIn &&
        tokenIn.isBase &&
        Number(newValue) > Number(tokenIn.maxBuySell)
      ) {
        setTokenInInputValue(tokenIn.maxBuySell.toString());
        return;
      }

      setTokenInInputValue(newValue);
    } else {
      setTokenInInputValue("");
      setTokenOutInputValue("");
    }
  }, []);

  const onInputTokenOut = useCallback((value: string) => {
    if (value) {
      setTokenOutInputValue(value);
    } else {
      setTokenOutInputValue("");
    }
  }, []);

  const handleChangePair = () => {
    setTokenInInputValue("");
    setTokenOutInputValue("");

    const oldTokenIn = tokenIn;
    const oldTokenOut = tokenOut;
    setChangeCount(changeCount + 1);
    setTokenIn(oldTokenOut);
    setTokenOut(oldTokenIn);

    // router.push({
    //   pathname: router.pathname,
    //   query: {
    //     ...router.query,
    //     sell: oldTokenOut?.contractAddress,
    //     buy: oldTokenIn?.contractAddress,
    //   },
    // });
  };

  const handleSelectTokenIn = (token: TToken) => {
    setTokenIn(token);
    setTokenInInputValue("");
    setTokenOutInputValue("");
  };

  const handleSelectTokenOut = (token: TToken) => {
    setTokenOut(token);
    setTokenInInputValue("");
    setTokenOutInputValue("");
  };

  useEffect(() => {
    if (!loading && Number(buyAmount) > 0 && tokenOut) {
      try {
        const val0 = tokenOut?.isBase
          ? Number(
              FormatDecimalsAsEth(buyAmount.toString(), tokenOut.decimals)
            ).toFixed(5)
          : Number(formatEther(BigInt(Number(buyAmount.toString())))).toFixed(
              5
            );

        setTokenOutInputValue(val0.toString());
      } catch (error) {
        console.log(error);
      }
    }
  }, [prices, buyAmount, loading]);

  const handleGetStarted = () => {
    router.push({
      pathname: "/trade",
      query: {
        sell: tokenIn?.contractAddress,
        buy: tokenOut?.contractAddress,
      },
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <WebSearchModal
        isOpen={tokenInModalWebIsOpen}
        onClose={() => setTokenInModalWebIsOpen(false)}
        onSave={handleSelectTokenIn}
        tokenList={
          !tokenOut
            ? [...quoteTokens, ...baseTokens]
            : tokenOut.isBase
            ? quoteTokens
            : baseTokens
        }
      />
      <WebSearchModal
        isOpen={tokenOutModalWebIsOpen}
        onClose={() => setTokenOutModalWebIsOpen(false)}
        onSave={handleSelectTokenOut}
        tokenList={
          !tokenIn
            ? [...baseTokens, ...quoteTokens]
            : tokenIn.isBase
            ? quoteTokens
            : baseTokens
        }
      />

      <MobileSearchModal
        isOpen={tokenInModalMobileIsOpen}
        onClose={() => setTokenInModalMobileIsOpen(false)}
        onSave={handleSelectTokenIn}
        tokenList={
          !tokenOut
            ? [...quoteTokens, ...baseTokens]
            : tokenOut.isBase
            ? quoteTokens
            : baseTokens
        }
      />
      <MobileSearchModal
        isOpen={tokenOutModalMobileIsOpen}
        onClose={() => setTokenOutModalMobileIsOpen(false)}
        onSave={handleSelectTokenOut}
        tokenList={
          !tokenIn
            ? [...baseTokens, ...quoteTokens]
            : tokenIn.isBase
            ? quoteTokens
            : baseTokens
        }
      />

      <div className="flex flex-col sm:w-full md:w-full lg:w-[500px] 2xl:w-[450px] bg-background p-2 rounded-xl sm:overflow-hidden">
        <div className="flex flex-col gap-1 relative w-full justify-center items-center">
          <div className="absolute border-3 border-background rounded-lg overflow-hidden">
            <Button
              size="sm"
              radius="none"
              onPress={() => handleChangePair()}
              isIconOnly
              className="bg-upper-background"
            >
              <ArrowDownIconThin fill="#ffffff" size={16} />
            </Button>
          </div>
          <div className="flex flex-col w-full  justify-center h-[120px] bg-upper-background rounded-2xl p-4 border border-upper-background hover:border-border">
            <span className=" text-small text-text-passive">Sell</span>
            <div className="flex w-full items-center">
              <Input
                radius="full"
                color="primary"
                size="lg"
                placeholder="0"
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                pattern="^[0-9]*[.]?[0-9]*$"
                minLength={1}
                maxLength={79}
                classNames={{
                  input:
                    "bg-transparent text-white placeholder:text-text-passive text-4xl",
                  inputWrapper:
                    "bg-transparent hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent p-0",
                  innerWrapper: "bg-transparent text-white",
                }}
                className="w-[60%] lg:w-[70%]"
                value={tokenInInputValue}
                onValueChange={onInputTokenIn}
              />
              <Button
                onClick={() =>
                  window.innerWidth < 768
                    ? setTokenInModalMobileIsOpen(true)
                    : setTokenInModalWebIsOpen(true)
                }
                radius="full"
                className={` bg-background border border-border ${
                  tokenIn ? "" : "bg-purple"
                } w-[45%] lg:w-[40%] justify-between p-1 px-2 text-white font-bold text-md`}
              >
                {tokenIn ? (
                  <div className="flex items-center gap-3 w-full">
                    <Avatar
                      radius="none"
                      src={tokenIn.image}
                      className="w-[25px] h-[25px] bg-transparent p-0 object-cover"
                    />
                    {tokenIn.symbol}
                  </div>
                ) : (
                  <div className="flex items-center pl-1 w-full">
                    <p>Select Token</p>
                  </div>
                )}

                <ChevronDownIconThin size={16} />
              </Button>
            </div>
            {tokenIn && tokenOut && (
              <div className="flex w-full items-center h-[20px] mt-2 justify-between text-text-passive font-semibold text-xs">
                <span>
                  {tokenInInputValue === "" ? null : (
                    <>
                      {!loading && prices.buyPrice ? (
                        <>{`$${FormatDecimalsAsEth(
                          prices.buyPrice.toString(),
                          tokenIn.isBase ? tokenIn.decimals : tokenOut.decimals
                        )}`}</>
                      ) : null}
                    </>
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full justify-center h-[120px] bg-upper-background rounded-2xl p-4 border border-upper-background hover:border-border">
            <span className=" text-small text-text-passive">Buy</span>
            <div className="flex w-full items-center">
              <Input
                radius="full"
                color="primary"
                size="lg"
                placeholder="0"
                inputMode="decimal"
                autoComplete="off"
                autoCorrect="off"
                disabled
                spellCheck="false"
                pattern="^[0-9]*[.,]?[0-9]*$"
                minLength={1}
                maxLength={79}
                classNames={{
                  input:
                    "bg-transparent text-white placeholder:text-text-passive text-4xl",
                  inputWrapper:
                    "bg-transparent hover:bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent p-0",
                  innerWrapper: "bg-transparent text-white",
                }}
                className="w-[60%] lg:w-[70%]"
                value={tokenOutInputValue}
                onValueChange={onInputTokenOut}
              />
              <Button
                onClick={() =>
                  window.innerWidth < 768
                    ? setTokenOutModalMobileIsOpen(true)
                    : setTokenOutModalWebIsOpen(true)
                }
                radius="full"
                className={` bg-background border border-border ${
                  tokenOut ? "" : "bg-purple"
                } w-[45%] lg:w-[40%] justify-between p-1 px-2 text-white font-bold text-md`}
              >
                {tokenOut ? (
                  <div className="flex items-center gap-3 w-full">
                    <Avatar
                      radius="none"
                      src={tokenOut.image}
                      className="w-[25px] h-[25px] bg-transparent p-0 object-cover"
                    />
                    {tokenOut.symbol}
                  </div>
                ) : (
                  <div className="flex items-center pl-1 w-full">
                    <p>Select Token</p>
                  </div>
                )}

                <ChevronDownIconThin size={16} />
              </Button>
            </div>
            {tokenOut && tokenIn && (
              <div className="flex w-full items-center h-[20px] mt-2 justify-between text-text-passive font-semibold text-xs">
                <span>
                  {tokenOutInputValue === "" ? null : (
                    <>
                      {!loading && prices.sellPrice ? (
                        <>{`$${FormatDecimalsAsEth(
                          prices.sellPrice.toString(),
                          tokenOut.isBase ? tokenOut.decimals : tokenIn.decimals
                        )} (-0.1%)`}</>
                      ) : null}
                    </>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <Button
            size="lg"
            disableRipple
            onPress={() => handleGetStarted()}
            className="mt-2 bg-purple text-white py-8 w-full text-lg font-bold"
          >
            Get started
          </Button>
        </div>
      </div>
    </>
  );
}
