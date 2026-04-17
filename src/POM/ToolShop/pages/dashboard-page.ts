import { Locator, Page } from "@playwright/test";



export class DashboardPage {

  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.dashboardHeader = page.getByRole("heading", { name: "Sales over the years" });
  }

  async verifyDashboardPageVisible() {
    await this.dashboardHeader.isVisible();
  }
}