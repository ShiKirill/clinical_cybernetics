import React from "react";
import block from "bem-cn";
import { observer } from "mobx-react";
import { Chip, Stack } from "@mui/material";
import { excelDataStore } from "../../stores";
import { Round } from "../../stores/utils";

import "./DataOutput.scss";

const cnDataOutput = block("data-output");

const DataOutput = () => {
  return (
    <div className={cnDataOutput()}>
      <Stack direction={"row"} spacing={2}>
        <Chip
          className={cnDataOutput("data-item").toString()}
          label={`COP: ${
            excelDataStore.cop?.intervalValue
              ? Round(excelDataStore.cop?.intervalValue, 2)
              : "-"
          }`}
        />
        <Chip
          className={cnDataOutput("data-item").toString()}
          label={`Чувствительность: ${
            excelDataStore.cop?.Se ? Round(excelDataStore.cop?.Se, 2) : "-"
          }`}
        />
        <Chip
          className={cnDataOutput("data-item").toString()}
          label={`Специфичность: ${
            excelDataStore.cop?.Sp ? Round(excelDataStore.cop?.Sp, 2) : "-"
          }`}
        />
        <Chip
          className={cnDataOutput("data-item").toString()}
          label={`Площадь под кривой: ${
            Round(excelDataStore.rocArea, 2) || "-"
          }`}
        />
      </Stack>
    </div>
  );
};

export default observer(DataOutput);
