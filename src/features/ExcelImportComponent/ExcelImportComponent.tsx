import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react";
import block from "bem-cn";

import PatientsRowModel from "../../stores/models/PatientsRowModel";
import { excelDataStore } from "../../stores";

import "./ExcelImportComponent.scss";

const cnExcelImportComponent = block("excelImportComponent");

type ExcelImportComponentType = {
  currentModel: PatientsRowModel;
};

const ExcelImportComponent = (props: ExcelImportComponentType) => {
  const { currentModel } = props;

  useEffect(() => {
    if (!currentModel.id) return;
    const element = document.getElementById(currentModel.id);

    if (!element) return;

    currentModel.initDragNDropListeners(element);

    return () => {
      currentModel.deInitDragNDropListeners(element);
    };
  }, [currentModel, currentModel.data.length]);

  const importBlock = (
    <div className={cnExcelImportComponent()}>
      <input
        type="file"
        id="fileElem"
        onChange={currentModel.handleFiles}
        className={cnExcelImportComponent("input")}
      />
      <p className={cnExcelImportComponent("text")}>Drop your file here</p>
      <div
        id={currentModel.id}
        className={cnExcelImportComponent("drop-zone")}
      ></div>
    </div>
  );

  return (
    <div
      className={cnExcelImportComponent("container", {
        fullHeight: !!currentModel.data.length,
      })}
    >
      <p className={cnExcelImportComponent("title")}>{currentModel.title}</p>

      {currentModel.data.length ? (
        <DataGrid
          className={cnExcelImportComponent("table").toString()}
          rows={currentModel.data}
          columns={excelDataStore.columns}
        ></DataGrid>
      ) : (
        importBlock
      )}
    </div>
  );
};

export default observer(ExcelImportComponent);
