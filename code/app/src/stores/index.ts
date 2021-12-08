import { action, computed, observable } from "mobx";
import { UserModel } from "../services/user/user.inteface";

//import { toJS } from "mobx";
class MainStore {
  @observable loading: boolean = false;
  @observable auth: boolean = false;
  @observable user: Partial<UserModel> = {};
  @observable activeServiceId = 0;
  @observable activeMeetupId = 0;

  @action
  setAuth(auth: boolean) {
    this.auth = auth;
  }

  @action
  setActiveService(id: number) {
    this.activeServiceId = id;
  }

  @action
  setActiveMeetup(id: number) {
    this.activeMeetupId = id;
  }

  @computed
  getAuth() {
    return this.auth;
  }

  @computed
  getActiveService() {
    return this.activeServiceId;
  }

  @computed
  getActiveMeetup() {
    return this.activeMeetupId;
  }

  @action
  setUser(user: UserModel) {
    this.user = user;
  }

  @computed
  getUser() {
    return this.user;
  }
}

const mainStore = new MainStore();
export default mainStore;
