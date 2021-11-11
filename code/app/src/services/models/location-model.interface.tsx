import { EntityModel } from "./entity-model.interface";
export interface LocationModel extends EntityModel{
    departure:string;
    arrival:string;
    price:string;
    currency:string;
    origin:string;
    destination:string;
} 