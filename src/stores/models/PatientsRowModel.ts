import { makeAutoObservable } from "mobx";
import * as XLSX from "xlsx";
import { DragNDropEvents } from "../../shared/enums";

type PatientsTableDataType = {
  id: number;
  value: number;
};

type PatientsRowModelType = {
  id: string;
  title: string;
};

class PatientsRowModel {
  constructor(dto: PatientsRowModelType) {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.id = dto.id;
    this.title = dto.title;
  }

  public id = "";

  public title = "";

  public data: PatientsTableDataType[] = [];

  public handleFiles(files: any) {
    const reader = new FileReader();

    reader.readAsArrayBuffer(files[0]);

    reader.onload = (e) => {
      if (e.target) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const sheetNames = workbook.SheetNames;
        const worksheet = workbook.Sheets[sheetNames[0]];

        const columnNames = (workbook as any).Strings.map(
          (column: any) => column.t
        ).filter((name: string) => !!name);
        const headerName = columnNames[0];
        const json = XLSX.utils.sheet_to_json(worksheet);

        this.data = json.map((item: any, index) => ({
          id: index + 1,
          value: item[headerName],
        }));
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

  public getMinValue() {
    return Math.min(...this.data.map((item) => item.value));
  }

  public getMaxValue() {
    return Math.max(...this.data.map((item) => item.value));
  }

  public getSortedDataValues = () => {
    return this.data
      .map((item) => item.value)
      .sort((a, b) => {
        return a - b;
      });
  };

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

  public clearStore() {
    this.data = [];
  }
}

export default PatientsRowModel;
