import React from "react";
import block from "bem-cn";
import { observer } from "mobx-react";

import Header from "./components/Header";
import MainComponent from "./components/MainContent";
import ExcelImportComponent from "./features/ExcelImportComponent";

import "./App.scss";
import { excelDataStore } from "./stores";

const cnApp = block("App");

const App = () => {
  return (
    <div className={cnApp()}>
      <Header />
      <MainComponent>
        <div className={cnApp("content")}>
          <div className={cnApp("table-block")}>
            <ExcelImportComponent id={excelDataStore.healthyPatientsId} />
          </div>
          <div className={cnApp("table-block")}>
            <ExcelImportComponent id={excelDataStore.sickPatientsId} />
          </div>
        </div>
      </MainComponent>
    </div>
  );
};

export default observer(App);
