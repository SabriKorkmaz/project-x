import { ModalType } from "./modal-type.enum";
import { ProcessType } from "../../utils/process-type.enum";

export interface CreateModalProps {
  type: ModalType;
  userId: number;
  mode?: ProcessType;
  data?: any;
}
