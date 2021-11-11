import Axios, { AxiosInstance } from "axios";
import { BaseModel } from "./base/base-model.interface";
import { SessionStorageUtil } from "../utils/session-storage.util";

export abstract class BaseService {
  private static readonly baseUrl = "http://localhost:54761/";
  private static axios?: AxiosInstance;
  private static readonly sessionStorageKey: string = "session-token";
  private static readonly deviceStorageKey: string = "device-token";
  static async initAxios() {
    if (this.axios) return;
    let sessionId = SessionStorageUtil.getItem(this.sessionStorageKey);
    let deviceId = SessionStorageUtil.getItem(this.deviceStorageKey);

    if (deviceId == null || deviceId == undefined || deviceId == "") {
      console.log("sad")
      let session = await this.getSession(this.baseUrl, undefined);
      (sessionId = session["session-id"]), (deviceId = session["device-id"]);
      console.log(session)
      SessionStorageUtil.setItem(this.sessionStorageKey, sessionId!);
      SessionStorageUtil.setItem(this.deviceStorageKey, deviceId!);
    }

    this.axios = Axios.create({
      headers: {
        "auth-token": `${sessionId},${deviceId}`,
      },
      baseURL: this.baseUrl,
    });
  }

  static async getDataArrayFromApi<ReturnType>(
    apiUrl: string,
    request: any
  ): Promise<ReturnType[]> {
    try {
      await this.initAxios();
      const response = await this.axios!.post(this.baseUrl + apiUrl, request);
      if (response.data.Data.length) {
        return response.data.Data;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  static async getSession(apiUrl: string, request: any): Promise<BaseModel> {
    try {
      const response = await Axios.post(
        this.baseUrl + "session/getSession",
        request
      );
      if (response.data) {
        return response.data.data;
      } else {
        return {} as BaseModel;
      }
    } catch (error) {
      throw error;
    }
  }
}
