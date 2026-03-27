import { expect, Locator, Page } from "@playwright/test";
import { NavBarComponent } from "../components/NavBar";
import { Logger } from "../../../_Tools/Logger";

export class MainPage {
  readonly navBar: NavBarComponent;
  readonly logger: Logger;

  constructor(page: Page) {
    this.navBar = new NavBarComponent(page);
    this.logger = new Logger();
  }

  async verifyElementsPage() {
    await Logger.logStep("Veryfing main page elements", async () => {
      await expect(this.navBar.homeBtn).toBeVisible();
      await expect(this.navBar.categoriesBtn).toBeVisible();
      await expect(this.navBar.contacBtn).toBeVisible();
      await expect(this.navBar.signInBtn).toBeVisible();
      await expect(this.navBar.localeBtn).toBeVisible();
      await expect(this.navBar.logoImg).toBeVisible();
      await expect(this.navBar.bannerImg).toBeVisible();
    });
    console.log(Logger.getTimestamp(), "All of the elements in Home page are visible");
  }
}
