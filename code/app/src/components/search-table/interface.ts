import { ModalType } from "../create-modal/modal-type.enum";

export interface ITableList {
  data: ITable;
}

export interface ITable {
  title: string[];
  data: any[];
  type: ModalType;
}
