import { makeAutoObservable } from "mobx";

class ExcelDataStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }
}

export default new ExcelDataStore();
