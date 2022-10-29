import { makeAutoObservable } from "mobx";
import PatientsRowModel from "./models/PatientsRowModel";
import { GridColDef } from "@mui/x-data-grid";

class ExcelDataStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public isCalculated = false;

  public columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 140 },
    { field: "value", headerName: "Значения параметра", width: 300 },
  ];

  public healthyPatientsModel = new PatientsRowModel({
    id: "healthyPatientsId",
    title: "Здоровые",
  });
  public sickPatientsModel = new PatientsRowModel({
    id: "sickPatientsId",
    title: "Больные",
  });

  public setIsCalculated(isCalculated: boolean) {
    this.isCalculated = isCalculated;
  }
}

export default new ExcelDataStore();
