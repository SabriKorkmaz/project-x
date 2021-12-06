import { BaseService } from "../base/base.service";
import { MeetupModel } from "../meetup/meetup.interface";

export abstract class ServiceService {
  private static readonly baseUrl = "service/";

  static async save(request: MeetupModel) {
    if (request.id) {
      return await BaseService.postData(request, this.baseUrl + "update");
    } else {
      return await BaseService.postData(request, this.baseUrl + "create");
    }
  }

  static async delete(id: number) {
    return await BaseService.postData(id, this.baseUrl + "delete");
  }

  static async get(id: number) {
    return await BaseService.getDataFromApi(id, this.baseUrl + "get");
  }
}
