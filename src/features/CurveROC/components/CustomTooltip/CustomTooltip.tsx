import React from "react";
import block from "bem-cn";

import {
  NameType,
  ValueType,
} from "recharts/src/component/DefaultTooltipContent";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { Round } from "../../../../stores/utils";
import "./CustomTooltip.scss";

const cnTooltip = block("customTooltip");

type TooltipProps = {
  payload: Payload<ValueType, NameType>[];
  label: string;
};

const CustomTooltip = (props: TooltipProps) => {
  const { payload, label } = props;
  const yValue = Number(payload[0].value);

  return (
    <div className={cnTooltip()}>
      <p className={cnTooltip('text')}>{`Значение x: ${label}`}</p>
      <p className={cnTooltip('text')}>{`Значение y: ${Round(yValue, 4)}`}</p>
    </div>
  );
};

export default CustomTooltip;
