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

export class Search {
  readonly page: Page;
  readonly searchDiv: Locator;
  readonly actions: Actions;
  readonly sortLookup: Locator;
  readonly priceSlider: Locator;
  readonly priceRangeMin: Locator;
  readonly priceRangeMax: Locator;
  readonly searchInput: Locator;
  readonly searchClear: Locator;
  readonly searchBtn: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.searchDiv = page.locator("#filters");
    this.sortLookup = page.getByRole("combobox", { name: "sort" });
    this.priceSlider = page.locator("css=ngx-slider.ngx-slider");
    this.priceRangeMin = page.locator("span.ngx-slider-pointer-min");
    this.priceRangeMax = page.locator("css=span.ngx-slider-pointer-max");
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.searchClear = page.getByRole("button", { name: "X" });
    this.searchBtn = page.getByRole("button", { name: "Search" });
    this.pageTitle = page.getByRole("heading", { name: /Category:/ });
  }

  public async getPageTitle() {
    const pageTitle = await this.pageTitle.textContent();
    const regex = /Category:\s(.+)/;
    const pageCategoryTitle = pageTitle?.match(regex);
    if (pageCategoryTitle) {
      console.log(`Current page category is "${pageCategoryTitle[1]}"`);
    }
    return pageCategoryTitle ?? "";
  }

  public async sortBy(sort: SortingTypes) {
    await this.sortLookup.selectOption({ label: sort });
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
    const moveSlider = async (slider: Locator, steps: number) => {
      await slider.focus();
      const key = steps > 0 ? "ArrowRight" : "ArrowLeft";
      for (let i = 0; i < Math.abs(steps); i++) {
        await this.page.keyboard.press(key);
      }
    };
    const handles = [this.priceRangeMin, this.priceRangeMax];
    const values = await Promise.all(
      handles.map((h) =>
        h.getAttribute("aria-valuenow").then((v) => Number.parseInt(v ?? "0")),
      ),
    );
    const sliders = handles
      .map((handle, i) => ({
        handle,
        value: values[i],
      }))
      .sort((a, b) => a.value - b.value);
    const minHandle = sliders[0];
    const maxHandle = sliders[1];

    if (min !== undefined && max !== undefined && min > maxHandle.value) {
      await moveSlider(maxHandle.handle, max - maxHandle.value);
      await moveSlider(minHandle.handle, min - minHandle.value);
    } else if (
      min !== undefined &&
      max !== undefined &&
      max < minHandle.value
    ) {
      await moveSlider(minHandle.handle, min - minHandle.value);
      await moveSlider(maxHandle.handle, max - maxHandle.value);
    }
  }

  public async verifySearchTranslation(translation: Object) {
    await this.actions.verifyTranslation(this.searchDiv, translation);
  }
}
