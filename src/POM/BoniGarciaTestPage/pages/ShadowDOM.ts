import { Locator, Page, expect } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export class ShadowDOM extends MainPage {
  private readonly shadowDOMparagraph: Locator;

  constructor(page: Page) {
    super(page);
    this.shadowDOMparagraph = page.locator("p");
  }

  public async getTextFromShadowDOM(): Promise<string> {
    const text = await this.shadowDOMparagraph.textContent();
    Logger.logStep(`Getting element from Shadow DOM`, async () => {
      console.log(`Text from Shadow DOM: ${text}`);
    });
    return text || "Error: Text content is null";
  }

  async verifyShadowText(text: string) {
    await expect(this.shadowDOMparagraph).toHaveText(text);
  }
}
