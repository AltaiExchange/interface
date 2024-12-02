import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { CloseIcon } from "@/components/ui/icons";

import { TBasicModalProps } from "@/types/modal.types";

const WebErrorModal: React.FC<TBasicModalProps> = ({ isOpen, onClose }) => {
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
          base: "bg-upper-background border border-border",
          footer: "border-t-[1px] border-border",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex items-center text-text-passive">
                <div className="relative flex justify-center items-center">
                  <div className="absolute top-0">
                    <CloseIcon size={40} fill={"#EF1212"} />
                  </div>
                  <Image
                    width={450}
                    height={450}
                    draggable={false}
                    className="w-[90%]"
                    src="/iconsSvgsPngs/wallet-transfer.svg"
                    alt="wallets"
                  />
                </div>
                <p className=" text-xl font-semibold text-white">
                  Transaction error occurred!
                </p>
                <p className=" text-tiny">Error message logged in console</p>
                <p className=" text-tiny">- error reported to admins</p>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center">
                <Button
                  radius="full"
                  disableAnimation
                  className=" font-semibold w-full bg-transparent border border-border text-white text-lg"
                  onPress={onClose}
                >
                  Back
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default WebErrorModal;
