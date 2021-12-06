import { UserModel } from "../../services/user/user.inteface";

export interface IHeader {
  auth: boolean;
  user: UserModel;
  children: any;
}
