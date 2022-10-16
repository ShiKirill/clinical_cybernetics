import { makeAutoObservable } from "mobx";
import PatientsRowModel from "./models/PatientsRowModel";

class ExcelDataStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public healthyPatientsId = "healthyPatientsId";
  public sickPatientsId = "sickPatientsId";

  public healthyPatientsModel = new PatientsRowModel();
  public sickPatientsModel = new PatientsRowModel();
}

export default new ExcelDataStore();
