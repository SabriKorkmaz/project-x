import { BaseModel } from "../base/base.interface";

export interface Meetup extends BaseModel {
  email: string;
  name: string;
  description: string;
  attendeeLimit: number;
  address: string;
  credit: number;
  duration: number;
  imageUrl: string;
  data: string;
  userId: number;
  password: string;
}
