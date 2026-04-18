import { test } from "@fixtures/ui.fixture";
import { CategoriesOptions } from "../../src/POM/ToolShop/components/navbar";

test(
  "Main page verification",
  { tag: ["@ui", "@regression"] },
  async ({ main }) => {
    await main.goto();
    await main.verifyPageUIElements();
    await main.actions.pageVisualTest("toolShopMainPage");
  },
);

test(
  "Change category page to 'Hand tools'",
  { tag: ["@ui", "@regression"] },
  async ({ main }) => {
    await main.goto();
    await main.navBar.pickCategory(CategoriesOptions.HandTools);
    await main.search.getPageTitle();
  },
);
