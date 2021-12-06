import { BaseModel } from "../base/base.interface";

export interface MeetupModel extends BaseModel {
  name: string;
  description: string;
  title: string;
  attendeeLimit: number;
  duration: string;
  imageUrl: string;
  date: Date | null;
  userId: number;
}
