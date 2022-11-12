import React from "react";
import block from "bem-cn";
import { observer } from "mobx-react";

import Header from "./components/Header";
import MainComponent from "./components/MainContent";

import "./App.scss";
import { appStore, excelDataStore } from "./stores";
import { AppTabs } from "./shared/enums";
import ExcelImportComponent from "./features/ExcelImportComponent";
import { Button } from "@mui/material";

const cnApp = block("App");

const App = () => {
  const clearData = () => {
    excelDataStore.setIsCalculated(false);
  };

  const calculateData = () => {
    excelDataStore.defineMinMaxModels();
    excelDataStore.calculateStep();
    excelDataStore.setIsCalculated(true);
  };

  return (
    <div className={cnApp()}>
      <Header />
      <MainComponent>
        <div className={cnApp("content")}>
          {appStore.currentTab === AppTabs.DataTab && (
            <>
              <div className={cnApp("table-block")}>
                <ExcelImportComponent
                  currentModel={excelDataStore.healthyPatientsModel}
                />
              </div>
              <div className={cnApp("table-block")}>
                <ExcelImportComponent
                  currentModel={excelDataStore.sickPatientsModel}
                />
              </div>
              {!!excelDataStore.healthyPatientsModel.data.length &&
                !!excelDataStore.sickPatientsModel.data.length && (
                  <div className={cnApp("buttons-wrapper")}>
                    <Button
                      className={cnApp("clear-btn").toString()}
                      variant="outlined"
                      onClick={clearData}
                    >
                      Clear
                    </Button>
                    <Button
                      className={cnApp("calculate-btn", {
                        disabled: excelDataStore.isCalculated,
                      }).toString()}
                      variant="contained"
                      disabled={excelDataStore.isCalculated}
                      onClick={calculateData}
                    >
                      Calculate
                    </Button>
                  </div>
                )}
            </>
          )}

          {appStore.currentTab === AppTabs.ChartTab && <></>}
        </div>
      </MainComponent>
    </div>
  );
};

export default observer(App);
