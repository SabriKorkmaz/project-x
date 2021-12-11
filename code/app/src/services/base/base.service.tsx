import Axios, { AxiosInstance } from "axios";
import { SessionStorageUtil } from "../../utils/session-storage.util";
import { LoginModel } from "../user/login.inteface";
import { ResponseModel } from "./response.interface";

export abstract class BaseService {
  public static readonly baseUrl = "http://localhost:4444/";
  private static axios?: AxiosInstance;
  private static readonly authToken: string = "x-access-token";

  static async initAxios() {
    if (this.axios) return;
    let token = await SessionStorageUtil.getItem(this.authToken);

    this.axios = Axios.create({
      headers: {
        "x-access-token": `${token}`,
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
        if (error.response.status === 401) {
          console.log(error.response.status);
          setInterval(() => {
            SessionStorageUtil.clear();
            window.location.reload();
          }, 1000);
        }
        return Promise.reject(error.response);
      }
    );
  }

  static async getDataArrayFromApi<ReturnType>(
    request: any,
    apiUrl: string
  ): Promise<ReturnType[]> {
    try {
      await this.initAxios();
      let response = await this.axios!.get(this.baseUrl + apiUrl, request);
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

  static async getDataFromApi<ReturnType>(
    request: any,
    apiUrl: string
  ): Promise<ReturnType> {
    try {
      await this.initAxios();
      let response = await this.axios!.get(this.baseUrl + apiUrl, request);
      return Promise.resolve<ReturnType>(response.data);
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

  static async postData<ReturnType>(request: any, url: string) {
    try {
      console.log(url);
      await this.initAxios();
      let response = await this.axios!.post(this.baseUrl + url, request);
      return Promise.resolve<ReturnType>(response.data);
    } catch (error: any) {
      console.log("error:", error);
      return error.data;
    }
  }

  static async delete(request: any, url: string): Promise<ReturnType<any>> {
    try {
      console.log(url);
      await this.initAxios();
      let response = await this.axios!.delete(this.baseUrl + url, request);
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
