import { BrowserContext, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export class CookiesPage extends MainPage {
  private readonly displayCookiesBtn: Locator;
  private readonly cookieInfo: Locator;
  private readonly context: BrowserContext;

  constructor(page: Page) {
    super(page);
    this.displayCookiesBtn = page.locator("#refresh-cookies");
    this.cookieInfo = page.locator("#cookies-list");
    this.context = page.context();
  }

  public async displayCookies(): Promise<void> {
    await Logger.logStep("Clicking btn to display cookies", async () => {
      await this.displayCookiesBtn.click();
    });
  }

  public async printCookiesInfo(): Promise<void> {
    await Logger.logStep("Reading cookies text printed on page", async () => {
      const cookiesText = await this.cookieInfo.textContent();
      console.log(`Cookies info: ${cookiesText}`);
    });
  }

  public async changeCookie(
    ...cookies: Array<{ name: string; value: string }>
  ): Promise<void> {
    await Logger.logStep(`Modifing cookies by values`, async () => {
      await this.page.goto(
        "https://bonigarcia.dev/selenium-webdriver-java/cookies.html",
      );
      await this.context.clearCookies();

      let formatedCookie = cookies.map((cookie) => ({
        name: cookie.name,
        value: cookie.value,
        domain: "bonigarcia.dev",
        path: "/",
        expires: Math.floor(Date.now() / 1000) + 60,
      }));
      await this.context.addCookies(formatedCookie);
    });
  }
}
