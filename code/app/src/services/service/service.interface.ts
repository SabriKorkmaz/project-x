import { BaseModel } from "../base/base.interface";
import { StatusEnum } from "../meetup/meetup.interface";
import { UserModel } from "../user/user.inteface";

export interface ServiceModel extends BaseModel {
  description: string;
  title: string;
  capacity: number;
  hours: number;
  imageUrl: string;
  date: any;
  address: string;
  userId: number;
  longitude: string;
  latitude: string;
  owner: Partial<UserModel>;
  status: StatusEnum | string;
}

export enum AttendeStatusEnum {
  Waiting = 1,
  Approved = 2,
  Rejected = 3,
}

export interface ServiceAttendees extends BaseModel {
  status: AttendeStatusEnum;
  serviceId: number;
  userId: number;
  createdDate: string;
  hours: number;
}
