import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export class DownloadFilePage extends MainPage {
  private readonly wdmLogo: Locator;
  private readonly wdmDoc: Locator;
  private readonly seleniumJupLogo: Locator;
  private readonly seleniumJupDoc: Locator;

  constructor(page: Page) {
    super(page);
    this.wdmLogo = page.getByRole("link", { name: "WebDriverManager logo" });
    this.wdmDoc = page.getByRole("link", { name: "WebDriverManager doc" });
    this.seleniumJupLogo = page.getByRole("link", {
      name: "Selenium-Jupiter logo",
    });
    this.seleniumJupDoc = page.getByRole("link", {
      name: "Selenium-Jupiter doc",
    });
  }

  public async downloadFile(file: number) {
    const buttons = [
      this.wdmLogo,
      this.wdmDoc,
      this.seleniumJupLogo,
      this.seleniumJupDoc,
    ];
    const downloadPromise = this.page.waitForEvent('download');
    await buttons[file-1].click();
    const download = await downloadPromise;
    const filename = download.suggestedFilename();
    console.log(Logger.getTimestamp() + ` Filename is: ${filename}`);
  }
}
