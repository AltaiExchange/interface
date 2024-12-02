import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { AccountIconBold } from "../../ui/icons";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

const MobileConnectButton = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();

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
        size="sm"
        startContent={isConnected === true ? <AccountIconBold /> : null}
        className={`text-purple font-semibold p-0 px-3 ${
          isConnected !== true ? "bg-purple/20 text-white" : "bg-transparent"
        }`}
        onClick={() => open()}
      >
        {isConnected !== true ? "Connect" : null}
      </Button>
    </>
  );
};

export default MobileConnectButton;
