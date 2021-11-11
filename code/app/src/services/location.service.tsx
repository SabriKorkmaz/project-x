import { BaseService } from "./base.service";
import { LocationModel } from "./models/location-model.interface";

export abstract class LocationService {
  private static readonly baseUrl = "location/";

  static async getLocations(locationRequestModel?: LocationModel) {
      return BaseService.getDataArrayFromApi<LocationModel>(
          this.baseUrl + "getLocations",
          locationRequestModel
      );
  }
} 