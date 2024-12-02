import React from "react";
import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";
import Image from "next/image";
import { CloseIcon } from "@/components/ui/icons";

import { TBasicModalProps } from "@/types/modal.types";

const MobileErrorModal: React.FC<TBasicModalProps> = ({ isOpen, onClose }) => {
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
          base: "bg-upper-background border border-border h-[50%]",
        }}
      >
        <ModalContent className="flex flex-col gap-5 items-center justify-center">
          <div className="flex flex-col gap-12">
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
            <div className="px-[10%]">
              <Button
                radius="full"
                disableAnimation
                className=" font-semibold w-full bg-transparent border border-border text-white text-lg"
                onPress={onClose}
              >
                Back
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MobileErrorModal;
