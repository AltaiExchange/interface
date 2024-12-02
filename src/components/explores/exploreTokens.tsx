import React, { useEffect, useState } from "react";
import useExploreHelpers from "@/hooks/useExploreHelpers";
import { TToken } from "@/types/interface.types";
import { TokenList } from "@/utils/constants";
import { NumberWithCommas } from "@/utils/helpers";
import { Avatar, Button, Link } from "@nextui-org/react";
import { useRouter } from "next/router";

const ExploreTokens = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Tokens_Titles: string[] = [
    "#",
    "Name",
    "Asset Type", // metal crypto
    "FDV",
    "Daily Change",
    "Last Price",
    "Transactions",
  ];

  const { fetchedTokens, isLoading } = useExploreHelpers(TokenList);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col w-full rounded-xl border border-border overflow-x-auto">
        {/* header */}
        <div className="sm:min-w-max md:w-full bg-upper-background p-4 rounded-t-xl border-b border-border">
          <div className="grid sm:grid-cols-[50px,200px,120px,160px,120px,140px,120px] md:grid-cols-[50px,200px,120px,160px,120px,140px,120px]  lg:grid-cols-[repeat(14,minmax(0,1fr))]">
            {Tokens_Titles.map((item: string, index: number) => (
              <div
                key={"explore_tokens_header_keys_key_" + index.toString()}
                className={`text-text-passive font-semibold h-full flex items-center ${
                  item === "#"
                    ? "lg:col-span-1 justify-start"
                    : item === "Name"
                    ? "lg:col-span-3 justify-start"
                    : "lg:col-span-2 text-end justify-end"
                }`}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* index */}
        <div className="h-full sm:min-w-max flex flex-col gap-5 my-3 w-full bg-background rounded-b-xl">
          {isLoading === false &&
            fetchedTokens.map((item: TToken, index: number) => (
              <div key={"explore_tokens_header_keys_key_" + index.toString()}>
                <Button
                  disableAnimation
                  onPress={() => router.push(`${`/explore/${item.symbol}`}`)}
                  radius="none"
                  className="w-full flex bg-transparent px-0 py-2 h-full text-white"
                >
                  <div className=" px-4 w-full grid sm:grid-cols-[50px,200px,120px,160px,120px,140px,120px] md:grid-cols-[50px,200px,120px,160px,120px,140px,120px] lg:grid-cols-[repeat(14,minmax(0,1fr))] font-semibold items-center text-medium">
                    <span className="text-text-passive text-start">
                      {index + 1}
                    </span>
                    <div className="flex lg:col-span-3 items-center gap-2">
                      <Avatar
                        src={item.image}
                        className="w-[25px] h-[25px] border-none bg-transparent"
                      />
                      <span>{item.name}</span>
                      <span className="text-text-passive">{item.symbol}</span>
                    </div>
                    <span className="lg:col-span-2 text-end">
                      {item.assetType}
                    </span>
                    <span className="lg:col-span-2 text-end text-sm overflow-hidden">
                      {`$${NumberWithCommas(
                        Number(Number(item.fdv).toFixed(1))
                      )}`}
                    </span>
                    <div className="lg:col-span-2 text-end text-sm">
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
                    <span className="lg:col-span-2 text-end text-sm">
                      {item.lastPrice}
                    </span>
                    <Link
                      isExternal
                      href={item.transactions}
                      showAnchorIcon
                      className="lg:col-span-2 text-white justify-end font-normal"
                    >
                      View
                    </Link>
                  </div>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ExploreTokens;
