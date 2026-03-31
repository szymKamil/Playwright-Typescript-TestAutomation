import { expect, Locator, Page } from "@playwright/test";
import { Actions } from "../../../_Tools/Actions";

export class CategoryTreeFilter {
  readonly categoryTree: Locator;
  readonly brandTree: Locator;
  readonly sustainabilityTree: Locator;
  readonly actions: Actions;

  constructor(page: Page) {
    this.categoryTree = page.getByRole("group", { name: "Categories" });
    this.brandTree = page.getByRole("group", { name: "Brands" });
    this.sustainabilityTree = page.getByRole("group", {
      name: "Eco-Friendly Products",
    });
    this.actions = new Actions(page);
  }

  public async pickCategoryByName(input: string) {
    await this.actions.checkUncheck(
      this.categoryTree.getByText(input, { exact: true }),
    );
  }
  public async pickBrandByName(input: string) {
    await this.actions.checkUncheck(
      this.brandTree.getByText(input, { exact: true }),
    );
  }
  public async pickSustainabilityProducts() {
    await this.actions.checkUncheck(
      this.sustainabilityTree.getByText("Show only eco-friendly products", {
        exact: true,
      }),
    );
  }
}
