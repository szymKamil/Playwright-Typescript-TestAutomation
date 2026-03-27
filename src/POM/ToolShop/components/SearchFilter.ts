import { expect, Locator, Page } from "@playwright/test";

enum SortingTypes {
  NameAZ = "Name (A-Z)",
  NameZA = "Name (Z-A)",
  PriceHighLow = "Price (High-Low)",
  PriceLowHigh = "Price (Low-High)",
  CORatingAE = "CO₂ Rating (A - E)",
  CORatingEA = "CO₂ Rating (E - A)",
}

export class MainPage {
  readonly sortLookup: Locator;
  readonly priceRange: Locator;
  readonly priceRangeMin: Locator;
  readonly priceRangeMax: Locator;
  readonly searchInput: Locator;
  readonly searchClear: Locator;
  readonly searchBtn: Locator;

  constructor(page: Page) {
    this.sortLookup = page.getByRole("combobox", { name: "sort" });
    this.priceRange = page.locator("css=ngx-slider.ngx-slider");
    this.priceRangeMin = page.locator("span.ngx-slider-pointer-min");
    this.priceRangeMax = page.locator("css=span.ngx-slider-pointer-max");
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.searchClear = page.getByRole("button", { name: "X" });
    this.searchBtn = page.getByRole("button", { name: "Search" });
  }

  public async sortBy(sort: SortingTypes) {
    await this.sortLookup.selectOption(sort);
    await expect(this.sortLookup).toHaveText(sort.toString());
  }

  public async search(input: string) {
    await this.searchInput.pressSequentially(input);
    await expect(this.searchInput).toHaveValue(input);
  }

  public async clickSearch(): Promise<void> {
    await this.searchBtn.isVisible();
    await this.searchBtn.click();
  }

  public async clearSearch(): Promise<void> {
    await this.searchClear.click();
    await expect(this.searchClear).toHaveValue("");
  }
}
