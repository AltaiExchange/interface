import React from "react";
import ExploreHeader from "@/components/explores/exploreHeader";
import { Button } from "@nextui-org/react";
import ExploreTokens from "@/components/explores/exploreTokens";
import Head from "next/head";

export default function Explore() {
  return (
    <>
      <Head>
        <title>Altai | Explore</title>
      </Head>
      <div
        translate="no"
        className="w-full flex flex-col gap-10 lg:gap-16 items-center justify-center sm:py-10 md:py-10 lg:py-24 px-[12px] lg:px-[15%] 2xl:px-[21%]"
      >
        <ExploreHeader />
        <div className="flex flex-col justify-start w-full gap-5">
          <div className="flex items-center gap-2">
            <Button
              disableRipple
              className="text-white bg-transparent text-2xl font-semibold p-0"
            >
              Tokens
            </Button>
          </div>
          <>
            <ExploreTokens />
          </>
        </div>
      </div>
    </>
  );
}
