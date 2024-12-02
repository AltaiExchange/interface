import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";
import { ArrowDownIconThin, ChevronDownIconThin } from "../ui/icons";

import { TToken } from "@/types/interface.types";
import WebSearchModal from "./web/webSearchModal";
import useSwapHelpers from "@/hooks/useSwapHelpers";
import { FormatDecimalsAsEth } from "@/utils/helpers";
import MobileSearchModal from "./mobile/mobileSearchModal";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

import {
  Format6DecimalsAsEth,
  GetContractAt,
  getERC20Allowance,
  getERC20Balance,
  GetSigner,
  getUpdatePriceFeedData,
} from "@/utils/web3";
import { DiamondContract, DiamondContractAddress } from "@/utils/contracts";
import WebErrorModal from "./web/webErrorModal";
import MobileErrorModal from "./mobile/mobileErrorModal";
import WebWaitModal from "./web/webWaitModal";
import MobileWaitModal from "./mobile/mobileWaitModal";
import WebApproveModal from "./web/webApproveModal";
import MobileApproveModal from "./mobile/mobileApproveModal";
import WebSuccessModal from "./web/webSuccessModal";
import { formatEther, parseEther } from "viem";
import MobileSuccessModal from "./mobile/mobileSuccessModal";

interface SwapsProps {
  baseTokens?: TToken[];
  quoteTokens?: TToken[];
}
export default function SwapsInitial({ baseTokens, quoteTokens }: SwapsProps) {
  const { open } = useWeb3Modal();
  // const { switchNetwork } = useSwitchNetwork();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [mounted, setMounted] = useState<boolean>(false);
  const [tokenIn, setTokenIn] = useState<TToken>();
  const [tokenOut, setTokenOut] = useState<TToken>();
  const [changeCount, setChangeCount] = useState<number>(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(true);
  const [tokenInUserInfo, setTokenInUserInfo] = useState({
    balance: "",
    allowance: "",
  });
  const [tokenOutUserInfo, setTokenOutUserInfo] = useState({
    balance: "",
  });

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

  // swaps
  const [swapTx, setSwapTx] = useState<string>("");
  const [errorModalWebIsOpen, setErrorModalWebIsOpen] =
    useState<boolean>(false);
  const [errorModalMobileIsOpen, setErrorModalMobileIsOpen] =
    useState<boolean>(false);
  const [waitModalWebIsOpen, setWaitModalWebIsOpen] = useState<boolean>(false);
  const [waitModalMobileIsOpen, setWaitModalMobileIsOpen] =
    useState<boolean>(false);
  const [approveModalWebIsOpen, setApproveModalWebIsOpen] =
    useState<boolean>(false);
  const [approveModalMobileIsOpen, setApproveModalMobileIsOpen] =
    useState<boolean>(false);
  const [successModalWebIsOpen, setSuccessModalWebIsOpen] =
    useState<boolean>(false);
  const [successModalMobileIsOpen, setSuccessModalMobileIsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const tokenSetted = () => {
      if (baseTokens && quoteTokens) {
        setTokenIn(baseTokens[0]);
        setTokenOut(quoteTokens[0]);
      }
    };
    tokenSetted();
    setMounted(true);
  }, [baseTokens, quoteTokens]);

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
    setIsLoadingBalance(true);
    setTokenInInputValue("");
    setTokenOutInputValue("");

    const oldTokenIn = tokenIn;
    const oldTokenOut = tokenOut;
    setChangeCount(changeCount + 1);
    setTokenIn(oldTokenOut);
    setTokenOut(oldTokenIn);
    setIsLoadingBalance(false);
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
        console.log("eFc : ", error);
      }
    }
  }, [prices, buyAmount, loading]);

  useEffect(() => {
    if (isConnected === true && tokenIn && tokenOut) {
      const getterInformation = async () => {
        setIsLoadingBalance(true);

        const [tokenInBalance, tokenInAllowance, tokenOutBalance] =
          await Promise.all([
            getERC20Balance(tokenIn.contract, address),
            getERC20Allowance(
              tokenIn.contract,
              address,
              DiamondContractAddress
            ),
            getERC20Balance(tokenOut.contract, address),
          ]);

        setTokenInUserInfo({
          balance: tokenInBalance.toString(),
          allowance: tokenInAllowance.toString(),
        });
        setTokenOutUserInfo({
          balance: tokenOutBalance.toString(),
        });
        setIsLoadingBalance(false);
      };
      getterInformation();
    }
  }, [tokenIn, tokenOut, address, chainId, isConnected, changeCount]);

  const approveFunction = async () => {
    try {
      if (window.innerWidth < 768) {
        setWaitModalMobileIsOpen(true);
      } else {
        setWaitModalWebIsOpen(true);
      }
      if (tokenIn) {
        const contract = GetContractAt(tokenIn.contract);
        const signer = await GetSigner(walletProvider);
        const swapAmount =
          Number(tokenInInputValue) * Number(10 ** tokenIn.decimals);
        const tx = await contract
          .connect(signer)
          // @ts-expect-error no-check-signer-error
          .approve(DiamondContractAddress, swapAmount);
        await tx.wait();
        if (window.innerWidth < 768) {
          setWaitModalMobileIsOpen(false);
          setApproveModalMobileIsOpen(true);
        } else {
          setWaitModalWebIsOpen(false);
          setApproveModalWebIsOpen(true);
        }
      }
    } catch (error) {
      console.log("approveFunction : ", error);
      if (window.innerWidth < 768) {
        setWaitModalMobileIsOpen(false);
        setErrorModalMobileIsOpen(false);
      } else {
        setWaitModalWebIsOpen(false);
        setErrorModalWebIsOpen(true);
      }
    }
  };

  const swapFunction = async () => {
    try {
      setApproveModalMobileIsOpen(false);
      setApproveModalWebIsOpen(false);

      if (window.innerWidth < 768) {
        setWaitModalMobileIsOpen(true);
      } else {
        setWaitModalWebIsOpen(true);
      }

      if (tokenIn) {
        const contract = GetContractAt(DiamondContract);
        const signer = await GetSigner(walletProvider);
        const swapAmount =
          Number(tokenInInputValue) * Number(10 ** tokenIn.decimals);

        const isBuy = tokenIn.isBase;
        const baseToken = isBuy ? tokenIn : tokenOut;
        const quoteToken = isBuy ? tokenOut : tokenIn;
        const data = await getUpdatePriceFeedData([
          baseToken?.priceId,
          quoteToken?.priceId,
        ]);

        const SwapProps = {
          isBuy: isBuy,
          updateData: data,
          amount: swapAmount,
          baseToken: baseToken?.contractAddress,
          quoteToken: quoteToken?.contractAddress,
        };

        const tx = await contract
          .connect(signer)
          // @ts-expect-error no-check-signer-error
          .swap(SwapProps, { value: BigInt(2) });
        await tx.wait();
        setSwapTx(tx.hash);

        if (window.innerWidth < 768) {
          setWaitModalMobileIsOpen(false);
          setSuccessModalMobileIsOpen(true);
        } else {
          setWaitModalWebIsOpen(false);
          setSuccessModalWebIsOpen(true);
        }
      }
    } catch (error) {
      console.log("swapFunction : ", error);
      if (window.innerWidth < 768) {
        setWaitModalMobileIsOpen(false);
        setErrorModalMobileIsOpen(true);
      } else {
        setWaitModalWebIsOpen(false);
        setErrorModalWebIsOpen(true);
      }
    }
  };

  const swapBTN = async () => {
    try {
      if (tokenIn && tokenOut) {
        const swapAmount =
          Number(tokenInInputValue) * Number(10 ** tokenIn.decimals);
        if (Number(tokenInUserInfo.allowance) < swapAmount) {
          await approveFunction();
        } else {
          await swapFunction();
        }
      } else {
        return;
      }
    } catch (error) {
      console.log("swapBTN : ", error);
    }
  };

  if (!mounted || !baseTokens || !quoteTokens) {
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
      <WebErrorModal
        isOpen={errorModalWebIsOpen}
        onClose={() => setErrorModalWebIsOpen(false)}
      />
      <MobileErrorModal
        isOpen={errorModalMobileIsOpen}
        onClose={() => setErrorModalMobileIsOpen(false)}
      />
      <WebApproveModal
        isOpen={approveModalWebIsOpen}
        onClose={() => setApproveModalWebIsOpen(false)}
        swap={() => swapFunction()}
        desc0={`You have successfully approved ${tokenIn?.symbol}`}
        desc1={"Please continue to swap."}
      />
      <MobileApproveModal
        isOpen={approveModalMobileIsOpen}
        onClose={() => setApproveModalMobileIsOpen(false)}
        swap={() => swapFunction()}
        desc0={`You have successfully approved ${tokenIn?.symbol}`}
        desc1={"Please continue to swap."}
      />
      <WebSuccessModal
        isOpen={successModalWebIsOpen}
        desc0={"You have successfully swapped"}
        desc1={swapTx}
      />
      <MobileSuccessModal
        isOpen={successModalMobileIsOpen}
        desc0={"You have successfully swapped"}
        desc1={swapTx}
      />
      <WebWaitModal isOpen={waitModalWebIsOpen} />
      <MobileWaitModal isOpen={waitModalMobileIsOpen} />

      <div className="flex flex-col w-[450px] sm:w-full sm:overflow-hidden">
        <div className="flex flex-col gap-1 relative w-full mt-2 justify-center items-center">
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
                <div className="flex items-center gap-1">
                  <span>Balance:</span>
                  {!isLoadingBalance ? (
                    <a
                      className="hover:cursor-pointer"
                      onClick={() => {
                        const currentValue = Number(
                          tokenIn.decimals === 18
                            ? formatEther(BigInt(tokenInUserInfo.balance))
                            : Format6DecimalsAsEth(
                                Number(tokenInUserInfo.balance)
                              )
                        );
                        const newValue = (currentValue - 0.00001).toFixed(5);
                        onInputTokenIn(newValue.toString());
                      }}
                    >
                      {Number(tokenInUserInfo.balance) > 0
                        ? `${
                            Number(tokenIn.decimals) === 18
                              ? Number(
                                  formatEther(BigInt(tokenInUserInfo.balance))
                                ).toFixed(5)
                              : Number(
                                  Format6DecimalsAsEth(
                                    Number(tokenInUserInfo.balance)
                                  )
                                ).toFixed(5)
                          }`
                        : "0"}
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
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
                <div className="flex items-center gap-1">
                  <span>Balance:</span>
                  {!isLoadingBalance ? (
                    <span>
                      {Number(tokenOutUserInfo.balance) > 0
                        ? `${
                            Number(tokenOut.decimals) === 18
                              ? Number(
                                  formatEther(BigInt(tokenOutUserInfo.balance))
                                ).toFixed(5)
                              : Number(
                                  FormatDecimalsAsEth(
                                    tokenOutUserInfo.balance,
                                    Number(tokenOut?.decimals)
                                  )
                                ).toFixed(5)
                          }`
                        : "0"}
                    </span>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          {isConnected !== true ? (
            <Button
              size="lg"
              disableRipple
              className="mt-2 bg-purple text-white py-8 w-full text-lg font-bold"
              onClick={() => open()}
            >
              Connect
            </Button>
          ) : !tokenIn || !tokenOut ? (
            <Button
              disabled
              size="lg"
              disableRipple
              className="mt-2 bg-upper-background py-8 text-text-passive w-full text-lg font-semibold"
            >
              Select a token
            </Button>
          ) : tokenInInputValue === "" || tokenOutInputValue === "" ? (
            <Button
              disabled
              size="lg"
              disableRipple
              className="mt-2 bg-upper-background py-8 text-text-passive w-full text-lg font-semibold"
            >
              Enter an amount
            </Button>
          ) : Number(tokenInInputValue) * Number(10 ** tokenIn.decimals) >
            BigInt(tokenInUserInfo.balance) ? (
            <Button
              disabled
              size="lg"
              disableRipple
              className="mt-2 bg-upper-background py-8 text-text-passive w-full text-lg font-semibold"
            >
              {`Insufficient ${tokenIn.symbol} balance`}
            </Button>
          ) : tokenIn.isBase &&
            Number(buyAmount) > Number(tokenOut.maxBuySell) ? (
            <Button
              size="lg"
              disableRipple
              disabled
              className="mt-2 bg-upper-background py-8 text-text-passive w-full text-lg font-semibold"
            >
              Amount exceeds max buy/sell limit
            </Button>
          ) : tokenOut.isBase &&
            Number(parseEther(tokenInInputValue)) >
              Number(tokenIn.maxBuySell) ? (
            <Button
              size="lg"
              disableRipple
              disabled
              className="mt-2 bg-upper-background py-8 text-text-passive w-full text-lg font-semibold"
            >
              Amount exceeds max buy/sell limit
            </Button>
          ) : (
            <Button
              size="lg"
              disableRipple
              onClick={() => swapBTN()}
              className="mt-2 bg-purple py-8 text-white w-full text-lg font-bold"
            >
              Swap
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
