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

const WebSuccessModal: React.FC<TSuccessModalProps> = ({
  isOpen,
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
        classNames={{
          body: "py-6",
          base: "bg-upper-background border border-border",
          footer: "border-t-[1px] border-border",
        }}
      >
        <ModalContent>
          <>
            <ModalBody className="flex items-center text-center text-white">
              <CheckIcon size={60} fill={"#AE22B0"} />
              <p className=" font-semibold text-lg">{desc0}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                radius="sm"
                className="font-semibold w-full bg-transparent border border-border text-white"
                onPress={() => window.location.reload()}
              >
                Back
              </Button>
              <Button
                radius="sm"
                as={Link}
                isExternal={true}
                showAnchorIcon={true}
                href={`${ArbitrumSepolia.explorerUrl}tx/${desc1}`}
                className=" font-semibold w-full bg-purple text-white"
              >
                View Explorer
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default WebSuccessModal;
