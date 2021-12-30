import { BaseModel } from "../base/base.interface";
import { ServiceModel } from "../service/service.interface";
import { MeetupModel } from "../meetup/meetup.interface";

export interface UserModel extends BaseModel {
  email: string;
  name: string;
  surname: string;
  password: string;
  recoveryHash: string;
  credit: number;
  invalidAttemptCount: number;
  admin: boolean;
  services: ServiceModel[];
  meetups: MeetupModel[];
  description?: string;
  profileImg?: string;
}
