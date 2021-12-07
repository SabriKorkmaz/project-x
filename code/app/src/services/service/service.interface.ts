import { BaseModel } from "../base/base.interface";

export interface ServiceModel extends BaseModel {
  name: string;
  description: string;
  title: string;
  capacity: number;
  duration: string;
  credit: number;
  imageUrl: string;
  date: Date | null;
  userId: number;
}
