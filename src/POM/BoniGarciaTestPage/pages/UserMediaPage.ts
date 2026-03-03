import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { th } from "@faker-js/faker";

export class UserMediaPage extends MainPage {
  readonly startBtn: Locator;
  readonly videoScreen: Locator;
  readonly devideInfo: Locator;
  readonly context: BrowserContext;

  constructor(page: Page) {
    super(page);
    this.startBtn = page.locator("#start");
    this.videoScreen = page.locator("#my-video");
    this.devideInfo = page.locator("#video-device");
    this.context = page.context();
  }

  public async runMediaTest(): Promise<void> {
    this.context.grantPermissions(["camera", "microphone"]);
    await this.startBtn.click();
    await expect(this.devideInfo).toHaveText(
      "Using video device: fake_device_0",
    );
    this.page.close();
  }
}
