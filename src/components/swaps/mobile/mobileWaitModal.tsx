import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  CircularProgress,
  ModalHeader,
} from "@nextui-org/react";

import { TBasicModalProps } from "@/types/modal.types";

const MobileWaitModal: React.FC<TBasicModalProps> = ({ isOpen }) => {
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
        <ModalContent>
          <ModalHeader className="flex flex-col text-2xl items-center gap-1 text-white font-bold">
            Waiting Transaction
          </ModalHeader>
          <ModalBody className="flex justify-center items-center">
            <CircularProgress
              classNames={{
                indicator: "stroke-purple",
                track: "stroke-background",
              }}
              size="lg"
              color="secondary"
              aria-label="Loading..."
            />
            <p className="text-text-passive text-center font-semibold">
              Please approve your transaction in your wallet
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MobileWaitModal;
