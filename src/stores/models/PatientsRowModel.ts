import { makeAutoObservable } from "mobx";
import * as XLSX from "xlsx";
import { DragNDropEvents } from "../../shared/enums";

class PatientsRowModel {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public handleFiles(files: any) {
    const reader = new FileReader();

    reader.readAsArrayBuffer(files[0]);

    reader.onload = function (e) {
      if (e.target) {
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
  }

  private eventHandlerFunction(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    let dt = event.dataTransfer;
    let files = dt?.files;

    if (event.type === DragNDropEvents.Drop) {
      this.handleFiles(files);
    }
  }

  public initDragNDropListeners(element: HTMLElement) {
    element.addEventListener(
      DragNDropEvents.DragEnter,
      this.eventHandlerFunction,
      false
    );
    element.addEventListener(
      DragNDropEvents.DragLeave,
      this.eventHandlerFunction,
      false
    );
    element.addEventListener(
      DragNDropEvents.DragOver,
      this.eventHandlerFunction,
      false
    );
    element.addEventListener(
      DragNDropEvents.Drop,
      this.eventHandlerFunction,
      false
    );
  }

  public deInitDragNDropListeners(element: HTMLElement) {
    element.removeEventListener(
      DragNDropEvents.DragEnter,
      this.eventHandlerFunction,
      false
    );
    element.removeEventListener(
      DragNDropEvents.DragLeave,
      this.eventHandlerFunction,
      false
    );
    element.removeEventListener(
      DragNDropEvents.DragOver,
      this.eventHandlerFunction,
      false
    );
    element.removeEventListener(
      DragNDropEvents.Drop,
      this.eventHandlerFunction,
      false
    );
  }
}

export default PatientsRowModel;
