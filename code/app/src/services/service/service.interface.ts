import { BaseModel } from "../base/base.interface";

export interface ServiceModel extends BaseModel {
  email: string;
  name: string;
  description: string;
  attendeeLimit: number;
  state: string;
  country: string;
  address: string;
  credit: number;
  imageUrl: string;
  data: string;
  userId: number;
  password: string;
}
