import { BaseModel } from "../base/base.interface";

export interface MeetupModel extends BaseModel {
  description: string;
  title: string;
  capacity: number;
  duration: string;
  imageUrl: string;
  address: string;
  date: any;
  userId: number;
}
