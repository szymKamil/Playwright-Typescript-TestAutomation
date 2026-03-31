import { expect, Locator, Page } from "@playwright/test";
import { Actions } from "../../../_Tools/Actions";

export enum SortingTypes {
  EmptySort = "",
  NameAZ = "Name (A - Z)",
  NameZA = "Name (Z - A)",
  PriceHighLow = "Price (High - Low)",
  PriceLowHigh = "Price (Low - High)",
  CORatingAE = "CO₂ Rating (A - E)",
  CORatingEA = "CO₂ Rating (E - A)",
}

export class SearchFunctions {
  readonly page: Page;
  readonly actions: Actions;
  readonly sortLookup: Locator;
  readonly priceSlider: Locator;
  readonly priceRangeMin: Locator;
  readonly priceRangeMax: Locator;
  readonly searchInput: Locator;
  readonly searchClear: Locator;
  readonly searchBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.sortLookup = page.getByRole("combobox", { name: "sort" });
    this.priceSlider = page.locator("css=ngx-slider.ngx-slider");
    this.priceRangeMin = page.locator("span.ngx-slider-pointer-min");
    this.priceRangeMax = page.locator("css=span.ngx-slider-pointer-max");
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.searchClear = page.getByRole("button", { name: "X" });
    this.searchBtn = page.getByRole("button", { name: "Search" });
  }

  public async sortBy(sort: SortingTypes) {
    await this.sortLookup.selectOption({label: sort});
    await expect(this.sortLookup).toHaveText(sort.toString());
  }

  public async search(input: string) {
    await this.searchInput.pressSequentially(input);
    await expect(this.searchInput).toHaveValue(input);
    await this.searchBtn.click();
  }

  public async clickSearch(): Promise<void> {
    await this.searchBtn.isVisible();
    await this.searchBtn.click();
  }

  public async clearSearch(): Promise<void> {
    await this.searchClear.click();
    await expect(this.searchClear).toHaveValue("");
  }

  public async setPriceRange(min?: number, max?: number) {
    await this.priceRangeMin.focus();
    const currentMin = await this.priceRangeMin.evaluate((el) =>
      Number.parseInt(el.getAttribute("aria-valuenow") ?? "0"),
    );
    const steps = min ? min - currentMin : 0;
    const key = steps > 0 ? "ArrowRight" : "ArrowLeft";
    for (let i = 0; i < Math.abs(steps); i++) {
      await this.page.keyboard.press(key);
    }

    await this.priceRangeMax.focus();
    const currentMax = await this.priceRangeMax.evaluate((el) =>
      Number.parseInt(el.getAttribute("aria-valuenow") ?? "0"),
    );
    const stepsMax = max ? max - currentMax : 100;
    const keyMax = stepsMax > 0 ? "ArrowRight" : "ArrowLeft";
    for (let i = 0; i < Math.abs(stepsMax); i++) {
      await this.page.keyboard.press(keyMax);
    }
  }
}
