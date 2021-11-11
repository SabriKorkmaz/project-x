export interface ResponseModel<T>{
    data:T
    status:string;
    message:string;
    userMessage:string;
    apiRequestId:string;
    controller:string;
}