import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";
import { access } from "fs/promises";
import { constants, mkdirSync } from "fs";
import path from "path";

export class DownloadFilePage extends MainPage {
  private readonly wdmLogo: Locator;
  private readonly wdmDoc: Locator;
  private readonly seleniumJupLogo: Locator;
  private readonly seleniumJupDoc: Locator;
  downloadedFile: unknown;

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

  async downloadFile(file: number) {
    const buttons = [
      this.wdmLogo,
      this.wdmDoc,
      this.seleniumJupLogo,
      this.seleniumJupDoc,
    ];

    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      buttons[file - 1].click(),
    ]);

    const filename = download.suggestedFilename();
    console.log(Logger.getTimestamp() + ` Filename is: ${filename}`);

    const filePath = path.join('./downloads', filename);
    await download.saveAs(filePath);
    return filePath;
  }

  async verifyFileExist(path: string) {
    await access(path, constants.F_OK);
    console.log(Logger.getTimestamp(), "File exists");
  }
}
