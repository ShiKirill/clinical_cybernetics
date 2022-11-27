import React from "react";
import { observer } from "mobx-react";
import {
  Dot,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { excelDataStore } from "../../stores";
import { Round } from "../../stores/utils";
import CustomDot from "./components/CustomDot";
import CustomTooltip from "./components/CustomTooltip";

const CurveROC = () => {
  const CustomizedDot = (props: any) => {
    const { payload, cx, cy } = props;

    if (
      excelDataStore.cop &&
      payload.xValue === Round(1 - excelDataStore.cop?.Sp, 2)
    )
      return <CustomDot x={cx} y={cy} radius={5} />;

    return <></>;
  };

  return (
    <ResponsiveContainer width={"100%"} height={"80%"}>
      <LineChart data={excelDataStore.chartData} height={250}>
        <XAxis dataKey={"xValue"} ticks={excelDataStore.ticksForXAxis}></XAxis>
        <YAxis dataKey={"yValue"}></YAxis>
        <Line
          type="monotone"
          dataKey="yValue"
          stroke="#8884d8"
          dot={<CustomizedDot />}
        />
        <Tooltip content={(props) => {
          const { active, payload, label } = props;

          if (active && payload && payload.length) {
            return <CustomTooltip payload={payload} label={label} />;
          }

          return null;
        }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default observer(CurveROC);
