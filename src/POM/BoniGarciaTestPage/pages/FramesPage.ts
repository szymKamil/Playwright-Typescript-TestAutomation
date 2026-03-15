import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { assert } from "node:console";
import { Logger } from "../../../_Tools/Logger";

export class FramesPage extends MainPage {
  private readonly paragraph: Locator;

  constructor(page: Page) {
    super(page);
    this.paragraph = this.page
      .frameLocator('frame[name="frame-body"]')
      .locator("p.lead");
  }

  public async verifyParagraphsInFrame() {
    await Logger.logStep("Verifing number of paragraphs", async () => {
      await expect(this.paragraph).toHaveCount(20);
      console.log("All paragraphs are visible");
    });
  }
}
