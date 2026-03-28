import { test } from "@playwright/test";
import * as constans from "../../src/POM/ToolShop/const/constans";
import { MainPage } from "../../src/POM/ToolShop/pages/mainPage";

test("Search test", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.search("Hammer");
  await mainPage.productList.findDisplayedProducts("hammer");
});
