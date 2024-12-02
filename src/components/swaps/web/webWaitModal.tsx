import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  CircularProgress,
} from "@nextui-org/react";
import { TBasicModalProps } from "@/types/modal.types";

const WebWaitModal: React.FC<TBasicModalProps> = ({ isOpen }) => {
  return (
    <>
      <Modal
        hideCloseButton={true}
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        classNames={{
          body: "py-6",
          backdrop: "blur",
          base: "bg-upper-background border border-border",
          header: "border-b-[1px] border-border",
        }}
      >
        <ModalContent>
          <>
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
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default WebWaitModal;
