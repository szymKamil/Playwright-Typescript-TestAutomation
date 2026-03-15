import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export class ConsoleLogsPage extends MainPage {
  private readonly leadParagraph: Locator;
  private readonly logsArray: string[] = [];

  constructor(page: Page) {
    super(page);
    this.leadParagraph = page.locator("p.lead");
  }

  public listenLogs(): void {
    this.page.on("console", (msg) => this.logsArray.push(msg.text()));
  }

  public async printLogs(): Promise<void> {
    await Logger.logStep("Printing logs after test", async () => {
      await this.waitForLogsToSettle();
      for (let i = 0; i < this.logsArray.length; i++) {
        console.log(`Log numer ${i} zawiera wpis: ${this.logsArray[i]}`);
      }
      this.page.removeAllListeners();
    });
  }

  private async waitForLogsToSettle(
    timeout = 1000,
    maxWait = 10000,
  ): Promise<void> {
    return new Promise((resolve) => {
      let timer: NodeJS.Timeout;
      const hardLimit = setTimeout(resolve, maxWait);
      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          clearTimeout(hardLimit);
          resolve();
        }, timeout);
      };
      resetTimer();
      this.page.on("console", resetTimer);
    });
  }
}
