import { BaseModel } from "../base/base.interface";
import { UserModel } from "../user/user.inteface";

export interface MeetupModel extends BaseModel {
  description: string;
  title: string;
  capacity: number;
  duration: string;
  imageUrl: string;
  address: string;
  date: any;
  userId: number;
  longitude: string;
  latitude: string;
  owner: Partial<UserModel>;
}

export enum StatusEnum {
  WaitingForApprove = 1,
  Completed = 2,
}
