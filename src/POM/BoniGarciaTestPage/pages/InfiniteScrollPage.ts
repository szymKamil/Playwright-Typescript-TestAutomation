import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export class InfiniteScrollPage extends MainPage {
  private readonly paragraphs: Locator;

  constructor(page: Page) {
    super(page);
    this.paragraphs = page.locator("p");
  }

  public async scrollXtimes(times: number): Promise<void> {
    await Logger.logStep("Scrolling page", async () => {
      let lastParagraphCount = await this.paragraphs.count();

      for (let i = 0; i < times; i++) {
        await this.paragraphs
          .nth(lastParagraphCount - 1)
          .scrollIntoViewIfNeeded();
        lastParagraphCount = await this.paragraphs.count();
        console.log(
          Logger.getTimestamp() +
            `Scrolled ${i + 1} times, current number of paragraphs: ${lastParagraphCount}`,
        );
      }
    });
  }

  public async getScrollPos() {
    await this.actions.getScrollPosition();
  }
}
