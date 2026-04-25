import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class LongPage extends MainPage {
  private readonly paragraphs: Locator;

  constructor(page: Page) {
    super(page);
    this.paragraphs = page.locator("p");
  }

  public async verifyNumberOfParagraphs(para?: number): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    const count = await this.paragraphs.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBe(para ?? 20);
    console.log(`Number of paragraphs on the page is: ${count}`);
  }

  public async getViewportHeight() {
    await this.actions.getScrollPosition();
  }

  public async scrollToBottomParagraph(): Promise<void> {
    let count = await this.paragraphs.count();
    await this.paragraphs.nth(count - 1).scrollIntoViewIfNeeded();
    console.log("Scrolled to the last paragraph");
  }
}
