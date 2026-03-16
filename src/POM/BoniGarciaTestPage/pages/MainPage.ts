import { Page, Locator, expect } from "@playwright/test";
import { Logger } from "../../../_Tools/Logger";
import { Actions } from "../../../_Tools/Actions";

export default class MainPage {
  readonly actions: Actions;
  readonly mainHeader: Locator;
  readonly logoImg: Locator;
  readonly cardBody: Locator;
  readonly subPageBtn: Locator;
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.mainHeader = page.locator("h1.display-4");
    this.logoImg = page.locator("img.img-fluid");
    this.cardBody = page.locator("div.card-body");
    this.subPageBtn = page.locator("a.btn.btn-outline-primary.mb-2");
  }

  async verifyMainPageElements(): Promise<void> {
    await Logger.logStep("Im verify elements on page", async () => {
      await expect(this.mainHeader).toBeVisible();
      await expect(this.logoImg).toBeVisible();
      await expect(this.cardBody).toHaveCount(6);
      await expect(this.subPageBtn).toHaveCount(27);
    });
  }

  async openPage(btnName: string): Promise<void> {
    await Logger.logStep(`Im opening ${btnName} page`, async () => {
      let btn = this.subPageBtn.getByText(btnName, { exact: true });
      await expect(btn).toHaveCount(1);
      await btn.first().click();
    });
  }

  async openMainPage(): Promise<void> {
    await this.page.goto("https://bonigarcia.dev/selenium-webdriver-java/");
  }

  async verifySnapshot() {
    await Logger.logStep(
      `Im verifing page comparing to screenshot`,
      async () => {
        await this.actions.pageVisualTest("mainPage");
      },
    );
  }
}
