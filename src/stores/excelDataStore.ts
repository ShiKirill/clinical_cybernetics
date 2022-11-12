import { makeAutoObservable } from "mobx";
import PatientsRowModel from "./models/PatientsRowModel";
import { GridColDef } from "@mui/x-data-grid";
import ParameterModel from "./models/ParameterModel";

class ExcelDataStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public step = 0;

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

  public minModel: PatientsRowModel | null = null;
  public maxModel: PatientsRowModel | null = null;

  public calculatedParams: ParameterModel[] = [];

  public setIsCalculated(isCalculated: boolean) {
    this.isCalculated = isCalculated;
  }

  public defineMinMaxModels() {
    this.minModel =
      this.healthyPatientsModel.getMinValue() <
      this.sickPatientsModel.getMinValue()
        ? this.healthyPatientsModel
        : this.sickPatientsModel;

    this.maxModel =
      this.healthyPatientsModel.getMinValue() <
      this.sickPatientsModel.getMinValue()
        ? this.sickPatientsModel
        : this.healthyPatientsModel;
  }

  public calculateStep() {
    if (!this.minModel || !this.maxModel) return;

    if (this.minModel.getMaxValue() < this.maxModel.getMinValue()) {
      this.step = 0;
      alert("Перекрытие между выборками отсутствует");
      return;
    }

    const diff = this.minModel.getMaxValue() - this.maxModel.getMinValue();

    this.step = diff / (this.minModel.data.length + this.maxModel.data.length);

    this.calculateMistakes();
  }

  public calculateMistakes() {
    if (!this.minModel || !this.maxModel) return;
    const maxModel = this.maxModel;
    const minModel = this.minModel;

    const interval = [
      ...minModel
        .getSortedDataValues()
        .filter((value) => value > maxModel.getMinValue()),
      ...maxModel
        .getSortedDataValues()
        .filter((value) => value < minModel.getMaxValue()),
    ].sort();

    interval.forEach((intervalValue) => {
      const valuesNhPh = this.minModel!.getSortedDataValues().reduce(
        (params, modelValue) => {
          modelValue <= intervalValue ? params.NH++ : params.PH++;

          return params;
        },
        { NH: 0, PH: 0 }
      );

      const valuesNdPd = this.maxModel!.getSortedDataValues().reduce(
        (params, modelValue) => {
          modelValue <= intervalValue ? params.ND++ : params.PD++;

          return params;
        },
        { ND: 0, PD: 0 }
      );

      const Se = valuesNdPd.PD / (valuesNdPd.PD + valuesNdPd.ND);
      const Sp = valuesNhPh.NH / (valuesNhPh.NH + valuesNhPh.PH);

      console.log(valuesNhPh);
      console.log(valuesNdPd);
    });
  }
}

export default new ExcelDataStore();
