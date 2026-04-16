import { test } from "@fixtures/ui.fixture";
import { CategoriesOptions } from "../../src/POM/ToolShop/components/NavBar";

test("Main page verification", async ({ main }) => {
  await main.goto();
  await main.verifyPageUIElements();
  await main.actions.pageVisualTest("toolShopMainPage");
});

test("Change category page to 'Hand tools'", async ({ main }) => {
  await main.goto();
  await main.navBar.pickCategory(CategoriesOptions.HandTools);
  await main.search.getPageTitle();
});

