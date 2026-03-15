import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class WebStoragePage extends MainPage {
  readonly displayLocalBtn: Locator;
  readonly displaySessionStorageBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.displayLocalBtn = page.locator("#display-local");
    this.displaySessionStorageBtn = page.locator("#display-session");
  }

  public async modifyLocalStorage(
    ...insert: Array<{ key: string; value: string }>
  ) {
    await this.page.evaluate((items) => {
      for (let i = 0; i < items.length; i++) {
        localStorage.setItem(items[i].key, items[i].value);
      }
    }, insert);
  }

  public async modifySessionStorage(
    ...insert: Array<{ key: string; value: string }>
  ) {
    await this.page.addInitScript((items) => {
      for (let i = 0; i < items.length; i++) {
        window.sessionStorage.setItem(items[i].key, items[i].value);
      }
    }, insert);
  }

  public async openLocalStorage() {
    await this.displayLocalBtn.click();
  }

  public async openSessionStorage() {
    await this.displaySessionStorageBtn.click();
  }
}
