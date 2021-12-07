import { ModalType } from "../create-modal/modal-type.enum";

export interface ITableList {
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  data: ITable;
  editModalType: ModalType;
}

export interface ITable {
  title: string[];
  data: any[];
}
