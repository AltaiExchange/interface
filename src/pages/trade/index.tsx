import React from "react";
import Swaps from "@/components/swaps";
import Head from "next/head";

export default function Trade() {
  return (
    <>
      <Head>
        <title>Altai</title>
      </Head>
      <div
        translate="no"
        className="w-full flex items-center justify-center sm:py-10 md:py-10 lg:py-24"
      >
        <Swaps />
      </div>
    </>
  );
}
