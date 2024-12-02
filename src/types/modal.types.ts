import { TToken } from "./interface.types";

export type TSwapTokenModal = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (token: TToken) => void;
  tokenList: TToken[];
};

export type TBasicModalProps = {
  isOpen: boolean;
  onClose?: () => void;
};
export type TBasicModalProps1 = {
  isOpen: boolean;
  onClose: () => void;
};
export type TApproveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  swap: () => void;
  desc0: string;
  desc1: string;
};
export type TSuccessModalProps = {
  isOpen: boolean;
  desc0: string;
  desc1: string;
};
