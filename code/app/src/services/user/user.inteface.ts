import { BaseModel } from "../base/base.interface";

export interface UserModel extends BaseModel {
  email: string;
  name: string;
  surname: string;
  password: string;
  recoveryHash: string;
  credit: number;
  invalidAttemptCount: number;
  admin: boolean;
}
