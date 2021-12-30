import { ModalType } from "../create-modal/modal-type.enum";

export interface IModal {
  children?: any;
  buttonName: string;
  width?: string;
  data?: any;
  type?: ModalType;
}
