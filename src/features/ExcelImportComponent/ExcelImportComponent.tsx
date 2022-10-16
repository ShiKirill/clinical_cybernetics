import React, { useEffect } from "react";
import block from "bem-cn";

import * as XLSX from "xlsx";
import { DragNDropEvents } from "../../shared/enums";

import "./ExcelImportComponent.scss";

const cnExcelImportComponent = block("excelImportComponent");

type ExcelImportComponentType = {
  id: string;
};

const ExcelImportComponent = (props: ExcelImportComponentType) => {
  const { id } = props;

  const handleFiles = (files: any) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(files[0]);

    reader.onload = function (e) {
      if (e.target) {
        console.log('TARGET: ', id)

        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        console.log(workbook);
        const sheetNames = workbook.SheetNames;
        const worksheet = workbook.Sheets[sheetNames[0]];

        const columnNames = (workbook as any).Strings.map(
          (column: any) => column.t
        ).filter((name: string) => !!name);
        console.log(columnNames);
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
      }
    };
  };

  useEffect(() => {
    if (!id) return;

    const element = document.getElementById(id);

    if (!element) return;

    window.addEventListener(DragNDropEvents.DragOver, (e) => {
      e.preventDefault();
    });
    window.addEventListener(DragNDropEvents.Drop, (e) => {
      e.preventDefault();
    });

    return () => {

    };
  }, [id]);

  return (
    <div className={cnExcelImportComponent()}>
      <input
        type="file"
        id="fileElem"
        onChange={handleFiles}
        className={cnExcelImportComponent("input")}
      />
      <p className={cnExcelImportComponent("text")}>Drop your file here</p>
      <div
        id={id}
        className={cnExcelImportComponent("drop-zone")}
      ></div>
    </div>
  );
};

export default ExcelImportComponent;
