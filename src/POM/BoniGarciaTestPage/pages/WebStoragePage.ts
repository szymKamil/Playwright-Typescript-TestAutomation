import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "src/_Tools/Logger";

export class WebStoragePage extends MainPage {
  private readonly displayLocalBtn: Locator;
  private readonly displaySessionStorageBtn: Locator;
  private readonly localStorage: Locator;
  private readonly sessionStorage: Locator;

  constructor(page: Page) {
    super(page);
    this.displayLocalBtn = page.locator("#display-local");
    this.displaySessionStorageBtn = page.locator("#display-session");
    this.localStorage = page.locator("#local-storage");
    this.sessionStorage = page.locator("#session-storage");
  }

  public async modifyLocalStorage(data: { key: string; value: string }[]) {
    await Logger.logStep(`I'm modifying local storage`, async () => {
      await this.page.evaluate((data) => {
        for (const input of data) {
          localStorage.setItem(input.key, input.value);
        }
      }, data);
    });
  }

  public async modifySessionStorage(data: { key: string; value: string }[]) {
    await Logger.logStep(`I'm modifying session storage`, async () => {
      await this.page.addInitScript((data) => {
        for (const input of data) {
          window.sessionStorage.setItem(input.key, input.value);
        }
      }, data);
    });
  }

  public async openLocalStorage() {
    await Logger.logStep(`Opening local storage section on page`, async () => {
      await this.displayLocalBtn.click();
    });
  }

  public async openSessionStorage() {
    await Logger.logStep(
      `Opening session storage section on page`,
      async () => {
        await this.displaySessionStorageBtn.click();
      },
    );
  }

  public async verifyLocalStorage(data: { key: string; value: string }[]) {
    await Logger.logStep(
      `Verifying test data in local storage section`,
      async () => {
        for (const input of data) {
          await expect(this.localStorage).toContainText(input.key);
          await expect(this.localStorage).toContainText(input.value);
        }
      },
    );
  }
  public async verifySessionStorage(data: { key: string; value: string }[]) {
    await Logger.logStep(
      `Verifying test data in session storage section`,
      async () => {
        for (const input of data) {
          await expect(this.sessionStorage).toContainText(input.key);
          await expect(this.sessionStorage).toContainText(input.value);
        }
      },
    );
  }
}
