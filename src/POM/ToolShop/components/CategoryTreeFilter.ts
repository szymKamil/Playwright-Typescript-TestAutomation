import { expect, Locator, Page } from "@playwright/test";

export class NavBarComponent {
  readonly categoryTree: Locator;
  readonly brandTree: Locator;
  readonly sustainabilityTree: Locator;

  constructor(page: Page) {
    this.categoryTree = page.getByRole("group", { name: "Categories" });
    this.brandTree = page.getByRole("group", { name: "Brands" });
    this.sustainabilityTree = page.getByRole("group", {
      name: "Sustainability",
    });
  }

  public async pickCategoryByName(input: string) {
    await expect(this.categoryTree).toBeVisible();
    await this.categoryTree.getByText(input).check();
  }
  public async pickBrandByName(input: string) {
    await expect(this.brandTree).toBeVisible();
    await this.brandTree.getByText(input).check();
  }
  public async pickSustainabilityByName(input: string) {
    await expect(this.sustainabilityTree).toBeVisible();
    await this.sustainabilityTree.getByText(input).check();
  }
}
