import React from "react";

const ExploreHeader = () => {
  const selectedToken = {
    name: "Gold",
    tvl: "$3.49B",
    volume: "$41.92B",
  };
  return (
    <>
      <div className="w-full grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-1 p-5 bg-upper-background rounded-xl">
          <span className="font-semibold text-text-passive">{`Total TVL`}</span>
          <span className="font-bold text-3xl">{selectedToken.tvl}</span>
        </div>
        <div className="flex flex-col gap-1 p-5 bg-upper-background rounded-xl">
          <span className="font-semibold text-text-passive">{`Total Volume`}</span>
          <span className="font-bold text-3xl">{selectedToken.volume}</span>
          <span className="font-medium text-text-passive text-sm">
            Past month
          </span>
        </div>
      </div>
    </>
  );
};
export default ExploreHeader;
