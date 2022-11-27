import { makeAutoObservable } from "mobx";
import { Round } from "../utils";

type ParameterModelType = {
  Se: number;
  Sp: number;
  Ph: number;
  Nd: number;
  intervalValue: number;
};

class ParameterModel {
  constructor(props: ParameterModelType) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.Se = props.Se;
    this.Sp = props.Sp;
    this.Ph = props.Ph;
    this.Nd = props.Nd;
    this.intervalValue = props.intervalValue;
    this.err = props.Nd + props.Ph;
  }

  public Se = 0;

  public Sp = 0;

  public Ph = 0;

  public Nd = 0;

  public intervalValue = 0;

  public err = 0;

  public getChartData() {
    return {
      xValue: Round(1 - this.Sp, 2),
      yValue: this.Se,
    };
  }
}

export default ParameterModel;
