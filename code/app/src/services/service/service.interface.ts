import { BaseModel } from "../base/base.interface";

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
}
