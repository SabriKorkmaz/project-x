import { BaseService } from "../base/base.service";
import { ServiceModel } from "./service.interface";

export abstract class ServiceService {
  private static readonly baseUrl = "service/";

  static async save(request: ServiceModel) {
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
