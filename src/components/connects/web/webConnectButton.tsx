import React, { useEffect, useState } from "react";

import { Button } from "@nextui-org/react";
import { AccountIconBold } from "../../ui/icons";
import { FormatAddressDesign } from "@/utils/helpers";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

const WebConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Button
        disableRipple
        radius="full"
        startContent={isConnected === true ? <AccountIconBold /> : ""}
        className={`text-purple font-medium px-7 py-5 ${
          isConnected !== true
            ? "bg-purple/20 text-white font-semibold"
            : "bg-transparent"
        }`}
        onClick={() => open()}
      >
        <>
          {isConnected !== true ? (
            "Connect"
          ) : (
            <>{address && <p>{FormatAddressDesign(address)}</p>}</>
          )}
        </>
      </Button>
    </>
  );
};

export default WebConnectButton;
