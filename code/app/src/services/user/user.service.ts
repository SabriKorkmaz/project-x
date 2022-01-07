import { BaseService } from "../base/base.service";
import { UserModel } from "./user.inteface";
import { LoginModel } from "./login.inteface";

export abstract class UserService {
  private static readonly baseUrl = "user/";

  static async login(request: LoginModel) {
    return await BaseService.login(request);
  }

  static async create(request: Partial<UserModel>) {
    return await BaseService.postData(request, this.baseUrl + "create");
  }

  static async update(request: Partial<UserModel>) {
    return await BaseService.postData(
      request,
      this.baseUrl + "update/" + request.id
    );
  }

  static async getUser<T>(id: number) {
    return await BaseService.getDataFromApi<T>(id, this.baseUrl + "get/" + id);
  }

  static async getHistory<T>(id: number) {
    return await BaseService.getDataFromApi<T>(
      id,
      this.baseUrl + "getHistory/" + id
    );
  }

  static async registerMeetup<T>(request: any) {
    return await BaseService.postData<T>(
      request,
      this.baseUrl + "registerMeetup"
    );
  }

  static async getMeetupAttendees<T>(id: any) {
    return await BaseService.getDataFromApi<T>(
      id,
      this.baseUrl + "getMeetupAttendees/" + id
    );
  }

  static async deleteRegisteredMeetup(id: any) {
    return await BaseService.delete(
      id,
      this.baseUrl + "deleteRegisteredMeetup/" + id
    );
  }

  static async acceptRegisteredMeetup<T>(id: any) {
    return await BaseService.postData<T>(
      id,
      this.baseUrl + "acceptRegisteredMeetup/" + id
    );
  }

  static async registerService<T>(request: any) {
    return await BaseService.postData<T>(
      request,
      this.baseUrl + "registerService"
    );
  }

  static async getServiceAttendees<T>(id: any) {
    return await BaseService.getDataFromApi<T>(
      id,
      this.baseUrl + "getServiceAttendees/" + id
    );
  }

  static async deleteRegisteredService(id: any) {
    return await BaseService.delete(
      id,
      this.baseUrl + "deleteRegisteredService/" + id
    );
  }

  static async updateRegisteredService<T>(request: any) {
    return await BaseService.postData<T>(
      request,
      this.baseUrl + "updateRegisteredService"
    );
  }

  static async updateRegisteredMeetup<T>(request: any) {
    return await BaseService.postData<T>(
      request,
      this.baseUrl + "updateRegisteredMeetup"
    );
  }

  static async search<T>(request: any) {
    return await BaseService.postData<T>(request, this.baseUrl + "search");
  }

  static async advancedSearch<T>(request: any) {
    return await BaseService.postData<T>(
      request,
      this.baseUrl + "advancedSearch"
    );
  }
}
