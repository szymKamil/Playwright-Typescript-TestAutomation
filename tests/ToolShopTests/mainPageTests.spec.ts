import { MainPage } from "../../src/POM/ToolShop/pages/MainPage";
import { test } from "@playwright/test";
import * as constans from "../../src/POM/ToolShop/utils/constans";
import { CategoriesOptions } from "../../src/POM/ToolShop/components/NavBar";

test("Main page verification", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.verifyMainPage();
});

test("Power tools category change", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.navBar.pickCategory(CategoriesOptions.HandTools);
});
