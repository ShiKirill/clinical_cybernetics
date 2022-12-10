import { makeAutoObservable } from "mobx";
import { AppTabs } from "../shared/enums";

class AppStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public currentTab: AppTabs = AppTabs.DataTab;

  public snackBarMessage = "";

  public appTabs = [
    { id: AppTabs.DataTab, text: "Данные" },
    {
      id: AppTabs.ResultsTab,
      text: "Результаты",
    },
  ];

  public setSnackBarMessage(snackBarMessage: string) {
    this.snackBarMessage = snackBarMessage;
  }

  public setCurrentTab(tab: AppTabs) {
    this.currentTab = tab;
  }

  public closeSnackBar() {
    this.snackBarMessage = "";
  }
}

export default new AppStore();
