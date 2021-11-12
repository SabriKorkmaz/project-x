import { observable } from "mobx";
//import { toJS } from "mobx";
class MainStore {

  @observable loading: boolean = false;

}

const mainStore = new MainStore();
export default mainStore;
