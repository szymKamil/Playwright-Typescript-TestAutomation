import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class IFramePage extends MainPage {
  private readonly iFrameElement: Locator;
  private readonly paragraphs: Locator;

  constructor(page: Page) {
    super(page);
    this.iFrameElement = page.locator("#my-iframe");
    this.paragraphs = page.frameLocator("#my-iframe").locator("p.lead");
  }

  public async scrollToLastParagraph() {
    expect(this.iFrameElement).toBeVisible();
    await this.paragraphs.nth(-1).scrollIntoViewIfNeeded();
    console.log("Scrolled to last paragraph. Paragraphs are visible.");
  }
}
