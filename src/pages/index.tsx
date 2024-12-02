import React, { useEffect, useState } from "react";
import SwapsHome from "@/components/swaps/swapsHome";

import { TokenList } from "@/utils/constants";
import { GenerateRandomAnimation } from "@/utils/helpers";
import useExploreHelpers from "@/hooks/useExploreHelpers";

import { useRouter } from "next/router";
import Image from "next/image";
import ExploreTokens from "@/components/explores/exploreTokens";

type Position = { top: number; left: number };
export default function Home() {
  const router = useRouter();
  const [positions, setPositions] = useState<Position[]>([]);
  const [animations, setAnimations] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { fetchedTokens, isLoading } = useExploreHelpers(TokenList);

  useEffect(() => {
    if (fetchedTokens) {
      const topY = window.innerWidth < 768 ? 95 : 70;
      const topYX = window.innerWidth < 768 ? 1 : 10;

      const initialPositions = fetchedTokens.map(() => ({
        top: Math.random() * topY + topYX,
        left:
          Math.random() < 0.5
            ? Math.random() * 30 + 10
            : Math.random() * 20 + 60,
      }));

      setPositions(initialPositions);
      const newAnimations = fetchedTokens.map(() => GenerateRandomAnimation());
      setAnimations(newAnimations);

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [fetchedTokens]);

  return (
    <>
      <div className="flex flex-col w-full h-full overflow-y-scroll scrollbar-hide">
        <div className="relative sm:h-full md:h-screen lg:h-[88vh] 2xl:h-[92.7vh] w-full">
          {!isLoading &&
            fetchedTokens.map((token, index) => (
              <a
                key={index}
                onClick={() => router.push(`/explore/${token.symbol}`)}
                style={{
                  top: `${positions[index]?.top}%`,
                  left: `${positions[index]?.left}%`,
                  opacity: isVisible ? 1 : 0,
                  transition:
                    "top 1s ease, left 1s ease, opacity 2s ease-in-out",
                }}
                className={`absolute w-20 hover:cursor-pointer h-20 group ${animations[index]}`}
              >
                <div className="p-1">
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={150}
                    draggable={false}
                    height={150}
                    priority
                    className="w-full h-full bg-transparent object-cover overflow-auto blur-sm group-hover:blur-0 transition-all duration-300"
                  />
                </div>
                <div className="absolute sm:hidden -bottom-12 left-1/2 transform -translate-x-1/2 text-white font-semibold transition-all duration-500 text-sm hidden group-hover:block">
                  <div className="flex flex-col items-center">
                    <span className=" whitespace-nowrap text-md font-bold">
                      {token.symbol}
                    </span>
                    <div className="text-end text-sm">
                      <span
                        className={`${
                          token.changeIncrease
                            ? "text-custom-green"
                            : "text-custom-red"
                        }`}
                      >
                        {token.changeIncrease ? "+" : "-"}
                      </span>
                      <span
                        className={`${
                          token.changeIncrease
                            ? "text-custom-green"
                            : "text-custom-red"
                        }`}
                      >{`%${token.dailyChange}`}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}

          <div className="w-full flex flex-col gap-8 z-10 items-center sm:py-10 md:py-10 lg:py-24">
            <div className="flex flex-col text-center z-10 text-5xl lg:text-6xl font-medium">
              <span>Swap precious metals</span>
              <span>anytime</span>
            </div>
            <div className="">
              <SwapsHome />
            </div>
            <div className="sm:px-5 md:px-5 lg:px-[35%] z-20 text-center font-medium text-md text-text-passive">
              <span>
                The largest on-chain marketplace. Buy and sell precious metals
                securely on Altai Network using 11+ currencies.
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-10 lg:gap-16 items-center justify-center sm:py-10 md:py-10 lg:py-24 px-[12px] lg:px-[15%] 2xl:px-[21%]">
          <ExploreTokens />
        </div>
      </div>
    </>
  );
}
