import { expect, Locator, Page } from "@playwright/test";
import { Actions } from "../../../_Tools/Actions";
import { MainPage } from "./MainPage";
import { CategoriesOptions } from "../components/NavBar";

export class RentalsPage {
  private readonly mainPage: MainPage;
  readonly page: Page;
  readonly actions: Actions;
  readonly rentalProductCard: Locator;
  readonly rentalProductImage: Locator;
  readonly rentalProductTitle: Locator;
  readonly rentalProductCardText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.actions = new Actions(page);
    this.rentalProductCard = page.locator("div.card");
    this.rentalProductImage = this.rentalProductCard.getByRole("img");
    this.rentalProductTitle = this.rentalProductCard.getByRole("heading");
    this.rentalProductCardText = this.rentalProductCard.getByRole("paragraph");
  }

  async verifyRentalsPage(fileName?: string) {
    expect(await this.rentalProductCard.count()).toBe(3);
    await this.actions.pageVisualTest(fileName ?? "rentalsPage");
  }

  async interceptImageRequests() {
    await this.page.route("**/img/**", (route) => route.abort());
  }

  async verifyImageInterception() {
    expect(
      await this.rentalProductImage
        .nth(0)
        .evaluate((el: HTMLImageElement) => el.naturalWidth),
    ).toBe(0);
  }

  //TODO: Refaktor pod POM
  async verifyImageLodaded() {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/products/excavator01.avif") &&
          response.status() === 200,
      ),
      this.mainPage.navBar.pickCategory(CategoriesOptions.Rentals),
    ]);
    expect(response.ok()).toBeTruthy();
  }
}
