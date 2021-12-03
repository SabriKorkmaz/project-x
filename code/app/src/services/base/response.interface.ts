export interface ResponseModel<T> {
  isSuccess: boolean;
  data: T;
  message?: string;
}
