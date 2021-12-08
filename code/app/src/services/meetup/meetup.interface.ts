import { BaseModel } from "../base/base.interface";

export interface MeetupModel extends BaseModel {
  name: string;
  description: string;
  title: string;
  capacity: number;
  duration: string;
  imageUrl: string;
  address: string;
  date: Date | null;
  userId: number;
}
