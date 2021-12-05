import { BaseService } from "../base/base.service";
import { UserModel } from "./user.inteface";
import { LoginModel } from "./login.inteface";

export abstract class UserService {
  private static readonly baseUrl = "user/";

  static async login(request: LoginModel) {
    return await BaseService.login(request);
  }

  static async create(request: Partial<UserModel>) {
    return await BaseService.postData(request, this.baseUrl + "/create");
  }
}
