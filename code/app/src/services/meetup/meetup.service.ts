import { BaseService } from "../base/base.service";

export abstract class MeetupService {
  private static readonly baseUrl = "meetup/";

  static async upload(formData: FormData) {
    let result = await BaseService.postData(formData, this.baseUrl + "upload");
    result.url = BaseService.baseUrl + result.url.slice(1);
    return result;
  }
}
