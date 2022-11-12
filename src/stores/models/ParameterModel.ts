import { makeAutoObservable } from "mobx";

class ParameterModel {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }
}

export default ParameterModel;
