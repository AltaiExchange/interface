import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Link,
} from "@nextui-org/react";
import { ArbitrumSepolia } from "@/utils/chains";
import { CheckIcon } from "@/components/ui/icons";

import { TSuccessModalProps } from "@/types/modal.types";

const MobileSuccessModal: React.FC<TSuccessModalProps> = ({
  isOpen,
  desc0,
  desc1,
}) => {
  return (
    <>
      <Modal
        hideCloseButton={true}
        backdrop="opaque"
        size="4xl"
        placement="bottom"
        scrollBehavior="inside"
        radius="none"
        isOpen={isOpen}
        style={{
          margin: 0,
          padding: 0,
        }}
        classNames={{
          body: "py-6",
          base: "bg-upper-background border border-border h-[35%]",
          header: "border-b-[1px] border-border w-full",
        }}
      >
        <ModalContent className="flex flex-col gap-5 items-center justify-center">
          <div className="flex flex-col w-full">
            <ModalBody className="flex items-center text-center text-white">
              <CheckIcon size={60} fill={"#AE22B0"} />
              <p className=" font-semibold text-lg">{desc0}</p>
            </ModalBody>
            <ModalFooter className="flex items-center gap-5 w-full">
              <Button
                radius="full"
                disableAnimation
                className="font-bold w-full bg-transparent border border-border text-white"
                onPress={() => window.location.reload()}
              >
                Back
              </Button>
              <Button
                radius="full"
                as={Link}
                disableAnimation
                isExternal={true}
                showAnchorIcon={true}
                href={`${ArbitrumSepolia.explorerUrl}tx/${desc1}`}
                className=" font-bold w-full bg-purple text-white"
              >
                View Explorer
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MobileSuccessModal;
