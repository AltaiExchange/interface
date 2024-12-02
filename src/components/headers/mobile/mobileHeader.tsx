import { Button, Link } from "@nextui-org/react";
import React, { useState } from "react";
import {
  DownIconBold,
  HamburgerMenuIcon,
  SearchBasicIcon,
  XSwapIcon,
} from "../../ui/icons";
import MobileHamburgerModal from "./mobileHamburgerModal";
import MobileConnectButton from "../../connects/mobile/mobileConnectButton";
import MobileSearchModalHeader from "./mobileSearchModal";

export default function MobileHeader() {
  const [hamburgerModalIsOpen, setHamburgerModalIsOpen] =
    useState<boolean>(false);

  const [searchModalIsOpen, setSearchModalIsOpen] = useState<boolean>(false);
  return (
    <>
      <MobileHamburgerModal
        isOpen={hamburgerModalIsOpen}
        onClose={() => setHamburgerModalIsOpen(false)}
      />
      <MobileSearchModalHeader
        isOpen={searchModalIsOpen}
        onClose={() => setSearchModalIsOpen(false)}
      />
      <div className="w-[40%] flex items-center">
        <Button
          isIconOnly
          as={Link}
          href="/"
          radius="none"
          disableRipple
          startContent={<XSwapIcon size={30} />}
          className="p-0 bg-transparent"
        />
        <Button
          isIconOnly
          radius="none"
          onPress={() => setHamburgerModalIsOpen(true)}
          startContent={<HamburgerMenuIcon />}
          endContent={<DownIconBold size={12} fill="#9b9b9b" />}
          className="bg-transparent"
        />
      </div>
      <div className="w-[60%] flex justify-end items-center">
        <Button
          isIconOnly
          disableRipple
          onPress={() => setSearchModalIsOpen(true)}
          startContent={
            <SearchBasicIcon
              width={20}
              height={20}
              className="text-text-passive"
            />
          }
          className="bg-transparent"
        />
        <MobileConnectButton />
      </div>
    </>
  );
}
