import { observable, action, computed } from "mobx";
import { LocationModel } from "../services/models/location-model.interface";
import { LocationService } from "../services/location.service";
import { toJS } from "mobx";
class MainStore {
  @observable journeyList: LocationModel[] = [];

  @observable selectedOriginId: number = 0;
  @observable selectedDestinationId: number = 0;
  @observable selectedOrigin: Partial<LocationModel> ={};
  @observable selectedDestination:Partial<LocationModel> ={};
  @observable originList: LocationModel[] = [];
  @observable destinationList: LocationModel[] = [];
  @observable departureDate: Date = new Date();
  @observable loading: boolean = false;

  @computed
  get destinations() {
    return toJS(this.originList).filter((k) => k.id != this.selectedOriginId);
  }
  @computed
  get origins() {
    return this.originList;
  }
  @computed
  get journeys() {
    return this.journeyList;
  }
  @computed
  get origin(){
    return this.selectedOrigin
  }
  @computed
  get destination(){
    return this.selectedDestination
  }

  @computed
  get isLoading() {
    return this.loading;
  }

  @action
  async getLocations() {
    this.loading = true;
    this.originList = await LocationService.getLocations();
    this.loading = false;
  }

  @action
  setSelectedOrigin(id: number) {
    this.selectedOriginId = id;
    this.selectedOrigin = toJS(this.originList).find(k=>k.id == id) as LocationModel
  }
  @action
  setSelectedDestination(id: number) {
    this.selectedDestinationId = id;
    this.selectedDestination = toJS(this.originList).find(k=>k.id == id) as LocationModel
  }
  @action
  setDepartureDate(date: Date) {
    this.departureDate = date;
  }
}

const mainStore = new MainStore();
export default mainStore;
