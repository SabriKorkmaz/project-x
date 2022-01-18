import { BaseModel } from "../base/base.interface";
import { UserModel } from "../user/user.inteface";

export interface MeetupModel extends BaseModel {
  description: string;
  title: string;
  capacity: number;
  imageUrl: string;
  address: string;
  date: any;
  userId: number;
  longitude: string;
  latitude: string;
  owner: Partial<UserModel>;
  status: StatusEnum | string;
}

export enum StatusEnum {
  Pending = 1,
  Completed = 2,
  NotCompleted = 3,
}

export enum AttendeStatusEnum {
  Waiting = 1,
  Approved = 2,
  Rejected = 3,
}

export interface MeetupAttendees extends BaseModel {
  status: AttendeStatusEnum;
  meetupId: number;
  userId: number;
  createdDate: string;
  hours: number;
  serviceId: number;
  handshakeStatus: StatusEnum;
}
