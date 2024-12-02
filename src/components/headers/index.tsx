import React from "react";
import WebHeader from "./web/webHeader";
import MobileHeader from "./mobile/mobileHeader";

export default function Header() {
  return (
    <>
      <div className="sm:hidden md:hidden lg:flex w-full h-[72px] items-center px-[12px] justify-between">
        <WebHeader />
      </div>
      <div className="sm:flex md:flex lg:hidden w-full h-[72px] items-center px-[10px] justify-between">
        <MobileHeader />
      </div>
    </>
  );
}
