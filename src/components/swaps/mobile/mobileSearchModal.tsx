import React, { useCallback, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";
import { CloseIconThin, SearchBasicIcon } from "@/components/ui/icons";

import { TSwapTokenModal } from "@/types/modal.types";
import { TToken } from "@/types/interface.types";

// hamburgermodal modal update set --g v-3 glp-1

const MobileSearchModal: React.FC<TSwapTokenModal> = ({
  isOpen,
  onClose,
  onSave,
  tokenList,
}) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const hasSearchFilter = Boolean(filterValue);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredTokens = useMemo(() => {
    if (tokenList) {
      let filteredItems = [...tokenList];

      if (hasSearchFilter) {
        filteredItems = filteredItems.filter(
          (item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.symbol.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.contractAddress
              .toLowerCase()
              .includes(filterValue.toLowerCase())
        );
      }

      return filteredItems.reverse();
    }
  }, [hasSearchFilter, filterValue, tokenList]);
  return (
    <>
      <Modal
        hideCloseButton={true}
        backdrop="blur"
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
          body: "py-6 ",
          base: "bg-background border border-border h-[80%] rounded-t-xl",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="w-full flex flex-col gap-1">
                <div className="w-full flex items-center justify-between">
                  <span className="text-white">Select a token</span>
                  <Button
                    radius="none"
                    isIconOnly
                    disableAnimation
                    onPress={() => onClose()}
                    startContent={<CloseIconThin fill="#ffffff" />}
                    className="bg-transparent p-0"
                  />
                </div>
                <Input
                  radius="full"
                  color="primary"
                  placeholder="Search tokens (name, symbol or address)"
                  value={filterValue}
                  onClear={() => setFilterValue("")}
                  onValueChange={onSearchChange}
                  startContent={
                    <SearchBasicIcon className={"text-text-passive"} />
                  }
                  classNames={{
                    input:
                      "bg-upper-background group-data-[focus=true]:bg-background text-white placeholder:text-text-passive text-md text-sm",
                    inputWrapper:
                      "bg-upper-background data-[hover=true]:bg-upper-background group-data-[focus=true]:bg-background border border-border",
                    innerWrapper:
                      "bg-upper-background group-data-[focus=true]:bg-background text-white",
                  }}
                  className="w-full"
                />
              </ModalHeader>
              <ModalBody className="w-full flex flex-col gap-2 items-start overflow-y-scroll">
                {filteredTokens?.map((item: TToken, index: number) => (
                  <div
                    key={
                      "filtered_tokens_web_search_modal_keys_key_" +
                      index.toString()
                    }
                    className="w-full"
                  >
                    <Button
                      radius="none"
                      onPress={() => {
                        onSave(item);
                        onClose();
                      }}
                      disableAnimation
                      className="p-0 w-full flex bg-transparent h-[60px] text-white font-semibold"
                    >
                      <div className="flex items-center w-full gap-2">
                        <Avatar
                          radius="none"
                          src={item.image}
                          className="bg-transparent w-[30px] h-[30px]"
                        />

                        <span className="text-2xl">{item.name}</span>
                        <span className=" text-text-passive">
                          {`(${item.symbol})`}
                        </span>
                      </div>
                    </Button>
                  </div>
                ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default MobileSearchModal;
