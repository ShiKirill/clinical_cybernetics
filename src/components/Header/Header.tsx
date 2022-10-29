import React from "react";
import { observer } from "mobx-react";
import block from "bem-cn";
import { appStore, excelDataStore } from "../../stores";

import "./Header.scss";
import { AppTabs } from "../../shared/enums";

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
                  appTab.id === AppTabs.ChartTab &&
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
