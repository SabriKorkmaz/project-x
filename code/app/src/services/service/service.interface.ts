import { BaseModel } from "../base/base.interface";
import { UserModel } from "../user/user.inteface";

export interface ServiceModel extends BaseModel {
  description: string;
  title: string;
  capacity: number;
  duration: string;
  credit: number;
  imageUrl: string;
  date: any;
  address: string;
  userId: number;
  longitude: string;
  latitude: string;
  owner: Partial<UserModel>;
}
