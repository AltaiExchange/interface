import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";

import { TApproveModalProps } from "@/types/modal.types";
import { CheckIcon } from "@/components/ui/icons";

const MobileApproveModal: React.FC<TApproveModalProps> = ({
  isOpen,
  onClose,
  swap,
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
        onClose={onClose}
        classNames={{
          body: "py-6",
          base: "bg-upper-background border border-border h-[35%]",
        }}
      >
        <ModalContent className="flex flex-col gap-5 items-center justify-center">
          {(onClose) => (
            <div className="flex flex-col w-full">
              <ModalBody className="flex items-center sm:text-center">
                <CheckIcon size={60} fill={"#AE22B0"} />
                <p>{desc0}</p>
                <p>{desc1}</p>
              </ModalBody>

              <ModalFooter className="flex items-center gap-5 w-full">
                <Button
                  radius="full"
                  disableAnimation
                  className="text-lg w-1/2 bg-transparent border border-border text-white"
                  onPress={onClose}
                >
                  Back
                </Button>
                <Button
                  radius="full"
                  disableAnimation
                  onClick={() => swap()}
                  className="w-1/2 bg-purple text-white font-bold text-lg"
                >
                  Swap
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default MobileApproveModal;
