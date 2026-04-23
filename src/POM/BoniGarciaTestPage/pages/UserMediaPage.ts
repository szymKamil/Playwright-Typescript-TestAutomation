import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class UserMediaPage extends MainPage {
  readonly startBtn: Locator;
  readonly videoScreen: Locator;
  readonly devideInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.startBtn = page.locator("#start");
    this.videoScreen = page.locator("#my-video");
    this.devideInfo = page.locator("#video-device");
  }

  public async runMediaTest(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.startBtn).toBeVisible();
    await this.startBtn.click();
    
  }

  public async assertDeviceInfo(device: string){
    await expect(this.devideInfo).toHaveText(device);
    console.log(`Device info ${device} is visible`)
  }
}
