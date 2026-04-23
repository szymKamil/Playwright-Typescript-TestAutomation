import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class LongPage extends MainPage {
  readonly paragraphs: Locator;

  constructor(page: Page) {
    super(page);
    this.paragraphs = page.locator("p");
  }

  public async verifyNumberOfParagraphs(para?: number): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    const count = await this.paragraphs.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBe(para ?? 20);
    console.log(`Number of paragraphs on the page is: ${count}`);
  }

  public async scrollToBottomParagraph(): Promise<void> {
    const startHeight = await this.page.evaluate(() => {
      return document.body.scrollHeight.toString();
    });
    let count = await this.paragraphs.count();
    await this.paragraphs.nth(count - 1).scrollIntoViewIfNeeded();
    console.log("Scrolled to the last paragraph");
    const endHeight = await this.page.evaluate(() => {
      return document.body.scrollHeight.toString();
    });
    console.log(`Starting height was ${startHeight}, height at last paragraph is ${endHeight}`)
  }
}
