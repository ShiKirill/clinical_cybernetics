import { makeAutoObservable } from "mobx";
import PatientsRowModel from "./models/PatientsRowModel";
import { GridColDef } from "@mui/x-data-grid";
import ParameterModel from "./models/ParameterModel";
import { Round } from "./utils";
import {appStore} from "./index";

export type ChartData = {
  xValue: number;
  yValue: number;
};

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

  public chartData: ChartData[] = [];

  public rocArea = 0;

  public cop: ParameterModel | null = null;

  public get ticksForXAxis() {
    const xValues = this.chartData.map((item) => item.xValue);

    return Array.from(new Set(xValues));
  }

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
      appStore.setSnackBarMessage('Перекрытие между выборками отсутствует!');
      return;
    }

    const diff = this.minModel.getMaxValue() - this.maxModel.getMinValue();

    const minModelItemsInInterval = this.minModel.data.filter(
      (item) => item.value >= this.maxModel!.getMinValue()
    );

    const maxModelItemsInInterval = this.maxModel.data.filter(
      (item) => item.value <= this.minModel!.getMaxValue()
    );

    this.step =
      diff / (minModelItemsInInterval.length + maxModelItemsInInterval.length);
  }

  public calculateMistakes() {
    if (!this.minModel || !this.maxModel) return;
    const maxModel = this.maxModel;
    const minModel = this.minModel;

    const interval = [
      ...minModel
        .getSortedDataValues()
        .filter((value) => value >= maxModel.getMinValue()),
      ...maxModel
        .getSortedDataValues()
        .filter((value) => value <= minModel.getMaxValue()),
    ].sort((a, b) => a - b);
    for (
      let i = interval[0];
      i < interval[interval.length - 1];
      i += this.step
    ) {
      const valuesNhPh = this.minModel!.getSortedDataValues().reduce(
        (params, modelValue) => {
          modelValue <= i ? params.NH++ : params.PH++;

          return params;
        },
        { NH: 0, PH: 0 }
      );
      const valuesNdPd = this.maxModel!.getSortedDataValues().reduce(
        (params, modelValue) => {
          modelValue <= i ? params.ND++ : params.PD++;

          return params;
        },
        { ND: 0, PD: 0 }
      );

      const Se = valuesNdPd.PD / (valuesNdPd.PD + valuesNdPd.ND);
      const Sp = valuesNhPh.NH / (valuesNhPh.NH + valuesNhPh.PH);

      this.calculatedParams.push(
        new ParameterModel({
          Se,
          Sp,
          Ph: valuesNhPh.PH,
          Nd: valuesNdPd.ND,
          intervalValue: i,
        })
      );
    }
  }

  public calculateCOP() {
    this.cop = this.calculatedParams.reduce((cop, param) => {
      if (param.err < cop.err) return param;
      else return cop;
    }, this.calculatedParams[0]);
  }

  public generateChartData() {
    const chartData = this.calculatedParams
      .map((param) => param.getChartData())
      .sort((a, b) => a.xValue - b.xValue)
      .sort((a, b) => a.yValue - b.yValue)
      .reduce((chartData: ChartData[], currentItem) => {
        if (!chartData.find((item) => item.xValue === currentItem.xValue))
          chartData.push(currentItem);
        return chartData;
      }, []);

    if (chartData[chartData.length - 1].xValue < 1) {
      let xMinStep = 1;
      chartData.forEach((item, index) => {
        if (index > 0 && item.xValue - chartData[index - 1].xValue)
          xMinStep = item.xValue - chartData[index - 1].xValue;
      });

      const stepsCount =
        (1 - chartData[chartData.length - 1].xValue) / xMinStep;

      const yMinStep =
        (1 - chartData[chartData.length - 1].yValue) / stepsCount;

      for (let i = 0; i < stepsCount; i++) {
        chartData.push({
          xValue: Round(chartData[chartData.length - 1].xValue + xMinStep, 2),
          yValue: chartData[chartData.length - 1].yValue + yMinStep,
        });
      }
    }

    this.chartData = chartData;
  }

  public getROCArea() {
    let area = 0;

    this.chartData.forEach((item, index) => {
      if (index > 0) {
        const prevItem = this.chartData[index - 1];

        area +=
          (item.xValue - prevItem.xValue) *
          ((item.yValue + prevItem.yValue) / 2);
      }
    });

    this.rocArea = area;
  }

  public analyzeData() {
    this.calculateStep();
    this.calculateMistakes();
    this.generateChartData();
    this.getROCArea();
    this.calculateCOP();
  }

  clearStore() {
    this.isCalculated = false;
    this.step = 0;
    this.minModel = null;
    this.maxModel = null;
    this.calculatedParams = [];
    this.chartData = [];
    this.rocArea = 0;
    this.cop = null;
    this.healthyPatientsModel.clearStore();
    this.sickPatientsModel.clearStore();
  }
}

export default new ExcelDataStore();
