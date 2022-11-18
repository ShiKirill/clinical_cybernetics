import React from "react";
import { observer } from "mobx-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { excelDataStore } from "../../stores";

const CurveROC = () => {
  return (
    <ResponsiveContainer width={"100%"} height={"80%"}>
      <LineChart data={excelDataStore.chartData} height={250}>
        <XAxis dataKey={"xValue"} ticks={excelDataStore.ticksForXAxis}></XAxis>
        <YAxis dataKey={"yValue"}></YAxis>
        <Line type="monotone" dataKey="yValue" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default observer(CurveROC);
