import { expect, Locator, Page } from "@playwright/test";
import { Actions } from "../../../_Tools/Actions";

export class CategoryTreeFilter {
  readonly page: Page;
  readonly fullCategoryTree: Locator;
  readonly handToolsTree: Locator;
  readonly brandTree: Locator;
  readonly sustainabilityTree: Locator;
  readonly actions: Actions;

  constructor(page: Page) {
    this.page = page;
    this.fullCategoryTree = page.getByRole("group", { name: "Categories" });
    this.handToolsTree = page.getByText('Hand Tools Hammer Hand Saw');
    this.brandTree = page.getByRole("group", { name: "Brands" });
    this.sustainabilityTree = page.getByRole("group", {
      name: "Eco-Friendly Products",
    });
    this.actions = new Actions(page);
  }

  public async pickCategoryByName(input: string) {
    await this.actions.checkUncheck(
      this.fullCategoryTree.getByText(input, { exact: true }),
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

  public async isCategorySelected(option: string, checked?: boolean): Promise<void> {
     await expect(this.handToolsTree).toBeVisible();
     await expect(this.handToolsTree.getByText(option)).toBeChecked({ checked: checked ?? true });
  }

  public async isBrandSelected(option: string): Promise<void> {
     await expect(this.brandTree).toBeVisible();
     await expect(this.brandTree.getByText(option)).toBeChecked({checked: true});
  }

  public async assertBrandFilterContain2Options(){
    await expect(this.brandTree.getByRole("checkbox")).toHaveCount(2);
  }


  

}
