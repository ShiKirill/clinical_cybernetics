import { makeAutoObservable } from "mobx";
import { AppTabs } from "../shared/enums";

class AppStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public currentTab: AppTabs = AppTabs.DataTab;

  public appTabs = [
    { id: AppTabs.DataTab, text: "Данные" },
    {
      id: AppTabs.ResultsTab,
      text: "Результаты",
    },
  ];

  public setCurrentTab(tab: AppTabs) {
    this.currentTab = tab;
  }
}

export default new AppStore();
