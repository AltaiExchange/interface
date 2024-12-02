import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Link,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import { TBasicModalProps } from "@/types/modal.types";

// hamburgermodal modal update set --g v-3 glp-1

const MobileHamburgerModal: React.FC<TBasicModalProps> = ({
  isOpen,
  onClose,
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
          base: "bg-background border border-border h-[60%] rounded-t-xl",
        }}
      >
        <ModalContent>
          <>
            <ModalBody className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <p className="font-semibold text-md">App</p>
                <div className="flex flex-col">
                  <Link href="/trade" className="text-text-passive">
                    Trade
                  </Link>
                  <Link href="/explore" className="text-text-passive">
                    Explore
                  </Link>
                </div>
              </div>
              <Accordion
                className="p-0 px-0"
                itemClasses={{
                  trigger: "p-0 py-2",
                  title: "text-white text-sm font-semibold",
                }}
                selectionMode="multiple"
              >
                <AccordionItem key="1" aria-label="Accordion 1" title="Company">
                  <div className="flex flex-col gap-2">
                    <Link className="text-text-passive">Careers</Link>
                    <Link className="text-text-passive">Blog</Link>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Accordion 2"
                  title="Protocol"
                >
                  <div className="flex flex-col gap-2">
                    <Link className="text-text-passive">Vote</Link>
                    <Link className="text-text-passive">Governance</Link>
                    <Link className="text-text-passive">Developers</Link>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Accordion 3"
                  title="Need help?"
                >
                  <div className="flex flex-col gap-2">
                    <Link className="text-text-passive">Help center</Link>
                    <Link className="text-text-passive">Contact us</Link>
                  </div>
                </AccordionItem>
              </Accordion>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MobileHamburgerModal;
