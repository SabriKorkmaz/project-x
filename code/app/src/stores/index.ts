import { action, computed, observable } from "mobx";
import { UserModel } from "../services/user/user.inteface";

//import { toJS } from "mobx";
class MainStore {
  @observable loading: boolean = false;
  @observable auth: boolean = false;
  @observable user: Partial<UserModel> = {};

  @action
  setAuth(auth: boolean) {
    this.auth = auth;
  }

  @computed
  getAuth() {
    return this.auth;
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
