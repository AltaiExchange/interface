import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button, Input, Link, Tooltip } from "@nextui-org/react";
import { HeaderWebTooltipMenu } from "@/utils/constants";
import {
  DownIconBold,
  SearchBasicIcon,
  XSwapIcon,
} from "@/components/ui/icons";
import { useRouter } from "next/router";

import { TMenu, TWebHeaderMenu } from "@/types/interface.types";
import WebConnectButton from "@/components/connects/web/webConnectButton";
import WebInnerSearch from "./webInnerSearch";

const WebHeader = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setInputValue(value);
    } else {
      setInputValue("");
    }
  }, []);

  return (
    <>
      <div className="w-[30%] h-full flex items-center">
        <Tooltip
          radius="sm"
          className="bg-background border border-border shadow-md shadow-black/50 w-[200px] flex items-start p-5 text-md"
          content={
            <div className="flex flex-col gap-5 w-full">
              {HeaderWebTooltipMenu.map(
                (item: TWebHeaderMenu, index: number) => (
                  <div
                    key={"header_tooltip_menu_keys_key_" + index.toString()}
                    className="w-full"
                  >
                    <h3>{item.title}</h3>
                    {item.child.map((child: TMenu, childIndex: number) => (
                      <div
                        key={
                          "header_tooltip_menu_keys_key_" +
                          index.toString() +
                          "_child_" +
                          childIndex.toString()
                        }
                        className="w-full"
                      >
                        <Link
                          href={child.link}
                          isExternal={child.isExternal}
                          className="text-text-passive hover:text-purple w-full"
                        >
                          {child.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          }
        >
          <Button
            as={Link}
            href="/"
            disableRipple
            startContent={<XSwapIcon size={26} />}
            endContent={<DownIconBold fill="#9b9b9b" />}
            className="bg-background text-purple p-0 text-md font-semibold"
          >
            Altai
          </Button>
        </Tooltip>
        <Button
          size="sm"
          disableRipple
          onPress={() =>
            router.asPath !== "/trade" ? router.push("/trade") : ""
          }
          className={`${
            router.asPath === "/trade" ? "text-white" : "text-text-passive"
          } text-md ml-3 bg-transparent font-semibold p-0`}
        >
          Trade
        </Button>

        <Button
          size="sm"
          disableRipple
          onPress={() =>
            router.asPath !== "/explore" ? router.push("/explore") : ""
          }
          className={`${
            router.asPath.startsWith("/explore")
              ? "text-white"
              : "text-text-passive"
          } text-md ml-3 bg-transparent font-semibold p-0`}
        >
          Explore
        </Button>
      </div>
      <div
        ref={searchWrapperRef}
        className="lg:w-[45%] 2xl:w-[30%] h-full flex relative items-center justify-center"
      >
        <Input
          radius="full"
          color="primary"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder="Search tokens"
          startContent={<SearchBasicIcon className={"text-text-passive"} />}
          classNames={{
            input:
              "bg-upper-background group-data-[focus=true]:bg-background text-white placeholder:text-text-passive text-md",
            inputWrapper:
              "bg-upper-background data-[hover=true]:bg-upper-background group-data-[focus=true]:bg-background border border-border",
            innerWrapper:
              "bg-upper-background group-data-[focus=true]:bg-background text-white",
          }}
          className="w-[70%]"
          onFocus={() => setIsFocused(true)}
          value={inputValue}
          onValueChange={onSearchChange}
        />
        {isFocused && (
          <div className="absolute md:mt-[92%] 2xl:mt-[100%] h-[500px] flex z-20 w-[70%] bg-upper-background border border-border p-4 rounded-xl shadow-lg">
            <WebInnerSearch
              onClose={() => setIsFocused(false)}
              filterValue={inputValue}
            />
          </div>
        )}
      </div>
      <div className="w-[30%] h-full flex items-center justify-end">
        <WebConnectButton />
      </div>
    </>
  );
};
export default WebHeader;
