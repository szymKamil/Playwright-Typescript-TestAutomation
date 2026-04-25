import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class LoadingImagesPage extends MainPage {
  readonly compasImage: Locator;
  readonly calednarImage: Locator;
  readonly awardImage: Locator;
  readonly landscapeImage: Locator;

  constructor(page: Page) {
    super(page);
    this.compasImage = page.locator("#compass");
    this.calednarImage = page.locator("#calendar");
    this.awardImage = page.locator("#award");
    this.landscapeImage = page.locator("#landscape");
  }

  async waitForImgToLoad(): Promise<void> {
    let images = [
      this.compasImage,
      this.calednarImage,
      this.awardImage,
      this.landscapeImage,
    ];
    for (const image of images) {
      await expect(image).toBeVisible();
    }
    const text = await this.page.locator("p.lead").textContent();
    if (text?.includes("Done!")) {
      console.log("All images loaded successfully");
    } else {
      console.log("Some images failed to load");
    }
  }
}
