import { EntityModel } from "./entity-model.interface";
export interface JourneyModel extends EntityModel{
    departure:string;
    originId:number;
    destinationId:number;
    date:Date;
    arrival:string;
    price:string;
    currency:string;
    origin:string;
    destination:string;
}