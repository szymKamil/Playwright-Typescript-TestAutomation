import { Locator, Page, expect } from "@playwright/test";
import { verify } from "node:crypto";
import { text } from "node:stream/consumers";

export class MyAccountPage {
  readonly myAccountHeader: Locator;

  constructor(public page: any) {
    this.myAccountHeader = page.getByRole("heading", { name: "My account" });
  }

  async verifyMyAccountPageVisible() {
    await expect(this.myAccountHeader).toBeVisible();
  }
}
