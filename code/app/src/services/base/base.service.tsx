import Axios, { AxiosInstance } from "axios";
import { SessionStorageUtil } from "../../utils/session-storage.util";
import { LoginModel } from "../user/login.inteface";
import { ResponseModel } from "./response.interface";

export abstract class BaseService {
  private static readonly baseUrl = "http://localhost:4444/";
  private static axios?: AxiosInstance;
  private static readonly authToken: string = "auth-token";

  static async initAxios() {
    if (this.axios) return;
    let token = await SessionStorageUtil.getItem(this.authToken);
    this.axios = Axios.create({
      headers: {
        "auth-token": `${token}`,
      },
      baseURL: this.baseUrl,
    });
    this.axios?.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 500) {
          error.response.data = { message: "Unexpected error" };
        }
        return Promise.reject(error.response);
      }
    );
  }

  static async getDataArrayFromApi<ReturnType>(
    apiUrl: string,
    request: any
  ): Promise<ReturnType[]> {
    try {
      await this.initAxios();
      let response = await this.axios!.post(this.baseUrl + "login", request);
      return response.data;
    } catch (error: any) {
      if (error.status === 401) {
        SessionStorageUtil.setItem(this.authToken, "");
        SessionStorageUtil.setItem("auth", "false");
        SessionStorageUtil.setItem("user", "");
        window.location.reload();
      }
      return error.data;
    }
  }

  static async postData(request: any, url: string): Promise<ReturnType<any>> {
    try {
      await this.initAxios();
      let response = await this.axios!.post(this.baseUrl + url, request);
      return response.data;
    } catch (error: any) {
      console.log("error:", error);
      return error.data;
    }
  }

  static async login(request: LoginModel): Promise<ResponseModel<string>> {
    try {
      await this.initAxios();
      let response = await this.axios!.post(this.baseUrl + "login", request);
      console.log(response);
      if (response.status === 200) {
        SessionStorageUtil.setItem(this.authToken, response.data.token);
        SessionStorageUtil.setItem("user", JSON.stringify(response.data.user));
        SessionStorageUtil.setItem("auth", "true");
      }
      return response.data;
    } catch (error: any) {
      console.log("error:", error);
      return error.data;
    }
  }
}
