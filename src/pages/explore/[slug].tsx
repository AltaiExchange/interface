import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TToken } from "@/types/interface.types";
import { TokenList } from "@/utils/constants";
import useExploreToken from "@/hooks/useExploreToken";
import { Avatar, Link, Snippet } from "@nextui-org/react";
import ExploreTokens from "@/components/explores/exploreTokens";
import SwapsInitial from "@/components/swaps/swapsInitial";
import { NumberWithCommas } from "@/utils/helpers";
import useTokenFilter from "@/hooks/useTokenFilter";
import Head from "next/head";

const TokenDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [token, setToken] = useState<TToken | null>(null);

  useEffect(() => {
    if (slug && TokenList.length > 0) {
      const matchedToken = TokenList.find((t) => `${t.symbol}` === slug);
      setToken(matchedToken || null);
    }
  }, [slug, TokenList]);

  const { fetchedToken, isLoading } = useExploreToken(
    token ? token : ({} as TToken)
  );

  const { baseTokens, quoteTokens } = useTokenFilter();

  if (!fetchedToken || isLoading)
    return (
      <>
        <Head>
          <title>Altai | Explore</title>
        </Head>
        {null}
      </>
    );

  return (
    <>
      <Head>
        <title>Altai | Explore</title>
      </Head>
      <div className="w-full flex flex-col gap-10 lg:gap-16 items-center justify-center sm:py-10 md:py-10 lg:py-24 px-[12px] lg:px-[15%] 2xl:px-[21%] ">
        <div className="flex sm:flex-col md:flex-col lg:flex-row sm:gap-5 md:gap-5 lg:gap-0 justify-between w-full">
          <div className="flex flex-col gap-5 sm:w-full md:w-full lg:w-1/2 lg:justify-between">
            <div className="flex w-full sm:flex-col md:flex-col lg:flex-row gap-5">
              <div>
                <Avatar
                  radius="none"
                  src={fetchedToken.image}
                  className="bg-transparent w-[90px] h-[90px]"
                  alt="token-logo"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-semibold">{`${fetchedToken.symbol} / USD`}</span>
                <span className="text-lg font-semibold text-text-passive">{`${fetchedToken.name.toUpperCase()} / US DOLLAR`}</span>
                <p className="text-sm text-white/90 font-medium">
                  {fetchedToken.description}
                </p>
                <Snippet
                  hideSymbol
                  size="sm"
                  className="bg-transparent text-white p-0"
                >
                  <span className="text-white">
                    {fetchedToken.contractAddress}
                  </span>
                </Snippet>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="w-full flex flex-col items-end p-2 px-3 bg-upper-background rounded-xl ">
                <span className="font-thin">Last Price</span>
                <span>{fetchedToken.lastPrice}</span>
              </div>
              <div className="w-full flex flex-col items-end p-2 px-3 bg-upper-background rounded-xl">
                <span className="font-thin">Asset Type</span>
                <span>{fetchedToken.assetType}</span>
              </div>
              <div className="w-full flex flex-col items-end p-2 px-3 bg-upper-background rounded-xl">
                <span className="font-thin">Last Updated</span>
                <span>{`<2s ago`}</span>
              </div>
              <div className="w-full flex flex-col items-end p-2 px-3 bg-upper-background rounded-xl">
                <span className="font-thin">FDV</span>
                <span>{`$${NumberWithCommas(
                  Number(Number(fetchedToken.fdv).toFixed(1))
                )}`}</span>
              </div>
              <div className="w-full flex flex-col items-end p-2 px-3 bg-upper-background rounded-xl">
                <span className="font-thin">Daily Change</span>
                <div className="lg:col-span-2 text-end text-sm">
                  <span
                    className={`${
                      fetchedToken.changeIncrease
                        ? "text-custom-green"
                        : "text-custom-red"
                    }`}
                  >
                    {fetchedToken.changeIncrease ? "+" : "-"}
                  </span>
                  <span
                    className={`${
                      fetchedToken.changeIncrease
                        ? "text-custom-green"
                        : "text-custom-red"
                    }`}
                  >{`%${fetchedToken.dailyChange}`}</span>
                </div>
              </div>
              <div className="w-full flex flex-col items-end p-2 px-3 bg-upper-background rounded-xl">
                <span className="font-thin">Transactions</span>
                <Link
                  isExternal
                  href={fetchedToken.transactions}
                  showAnchorIcon
                  className="lg:col-span-2 text-white justify-end font-normal"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          <SwapsInitial
            baseTokens={fetchedToken.isBase ? [fetchedToken] : baseTokens}
            quoteTokens={fetchedToken.isBase ? quoteTokens : [fetchedToken]}
          />
        </div>
        <ExploreTokens />
      </div>
    </>
  );
};

export default TokenDetailPage;
