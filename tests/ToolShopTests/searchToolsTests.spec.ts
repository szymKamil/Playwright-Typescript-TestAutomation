import { test } from "@playwright/test";
import * as constans from "../../src/POM/ToolShop/utils/constans";
import { MainPage } from "../../src/POM/ToolShop/pages/mainPage";

test("Search test", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.search("Hammer");
  await mainPage.productList.findDisplayedProducts("hammer");
});

test("Filter test by category", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.categoryTree.pickCategoryByName("Saw");
  await mainPage.productList.findDisplayedProducts("Saw");
});

test("Filter test by brand", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.categoryTree.pickCategoryByName("Saw");
  await mainPage.productList.findDisplayedProducts("Saw");
});

test("Test price range", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.setPriceRange(70, 76);
  await mainPage.productList.findDisplayedProducts("Belt Sander");
});
