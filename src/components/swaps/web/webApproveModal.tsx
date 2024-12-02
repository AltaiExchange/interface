import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { TApproveModalProps } from "@/types/modal.types";
import { CheckIcon } from "@/components/ui/icons";

const WebApproveModal: React.FC<TApproveModalProps> = ({
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
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          body: "py-6",
          backdrop: "blur",
          base: "bg-upper-background border border-border",
          footer: "border-t-[1px] border-border",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex items-center sm:text-center">
                <CheckIcon size={60} fill={"#AE22B0"} />
                <p>{desc0}</p>
                <p>{desc1}</p>
              </ModalBody>
              <ModalFooter>
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default WebApproveModal;
