import React, { useEffect } from "react";
import block from "bem-cn";

import "./ExcelImportComponent.scss";

const cnExcelImportComponent = block("excelImportComponent");

const dropZoneId = "dropZone";

const ExcelImportComponent = () => {
  const handleFiles = (files: any) => {
    console.log(files);
  };

  useEffect(() => {
    const handlerFunction = (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()

      console.log(event.type);
    };

    const element = document.getElementById(dropZoneId);

    if (!element) return;

    element.addEventListener("dragenter", handlerFunction, false);
    element.addEventListener("dragleave", handlerFunction, false);
    element.addEventListener("dragover", handlerFunction, false);
    element.addEventListener("drop", handlerFunction, false);

    return () => {
      element.removeEventListener("dragenter", handlerFunction, false);
      element.removeEventListener("dragleave", handlerFunction, false);
      element.removeEventListener("dragover", handlerFunction, false);
      element.removeEventListener("drop", handlerFunction, false);
    };
  }, []);
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
        id={dropZoneId}
        className={cnExcelImportComponent("drop-zone")}
      ></div>
    </div>
  );
};

export default ExcelImportComponent;
