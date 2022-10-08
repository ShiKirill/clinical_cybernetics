import React from "react";
import block from "bem-cn";
import Header from "./components/Header";
import MainComponent from "./components/MainContent";

import "./App.scss";
import ExcelImportComponent from "./features/ExcelImportComponent";

const cnApp = block("App");

function App() {
  return (
    <div className={cnApp()}>
      <Header />
      <MainComponent>
        <>
          <ExcelImportComponent />
        </>
      </MainComponent>
    </div>
  );
}

export default App;
