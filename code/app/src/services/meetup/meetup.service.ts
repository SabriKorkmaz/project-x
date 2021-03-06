import { BaseService } from "../base/base.service";
import { MeetupModel } from "./meetup.interface";
import { ServiceModel } from "../service/service.interface";

export abstract class MeetupService {
  private static readonly baseUrl = "meetup/";

  static async upload(formData: FormData) {
    return await BaseService.postData(formData, this.baseUrl + "upload");
  }

  static async updateStatus(request: Partial<ServiceModel>) {
    return await BaseService.postData(
      request,
      this.baseUrl + "updateStatus/" + request.id
    );
  }

  static async save(request: MeetupModel) {
    if (request.id) {
      return await BaseService.postData(
        request,
        this.baseUrl + "update/" + request.id
      );
    } else {
      return await BaseService.postData(request, this.baseUrl + "create");
    }
  }

  static async delete(id: number) {
    return await BaseService.delete(id, this.baseUrl + "delete/" + id);
  }

  static async get<T>(id: number) {
    return await BaseService.getDataFromApi<T>(id, this.baseUrl + "get/" + id);
  }

  static async getAll<T>(userId: number) {
    return await BaseService.getDataFromApi<T>(
      undefined,
      this.baseUrl + "getAll/" + userId
    );
  }

  static async getMeetups(servicesIds: number[]) {
    return await BaseService.postData(servicesIds, this.baseUrl + "getMeetups");
  }

  static async getLatest<T>() {
    return await BaseService.getDataFromApi<T>({}, this.baseUrl + "latest");
  }

  static async createComment(request: any) {
    if (request.id) {
      return await BaseService.postData(
        request,
        this.baseUrl + "updateComment/" + request.id
      );
    } else {
      return await BaseService.postData(
        request,
        this.baseUrl + "createComment"
      );
    }
  }
}
