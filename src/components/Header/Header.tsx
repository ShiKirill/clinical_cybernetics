import React from "react";
import { observer } from "mobx-react";
import block from "bem-cn";
import { appStore, excelDataStore } from "../../stores";
import { AppTabs } from "../../shared/enums";

import "./Header.scss";

const cnHeader = block("appHeader");

const Header = () => {
  return (
    <div className={cnHeader()}>
      <div className={cnHeader("tabs-container").toString()}>
        {appStore.appTabs.map((appTab) => {
          const selectTab = () => {
            appStore.setCurrentTab(appTab.id);
          };

          return (
            <span
              className={cnHeader("tab-item", {
                selected: appStore.currentTab === appTab.id,
                hidden:
                  appTab.id === AppTabs.ResultsTab &&
                  !excelDataStore.isCalculated,
              }).toString()}
              onClick={selectTab}
              key={appTab.id}
            >
              {appTab.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default observer(Header);
