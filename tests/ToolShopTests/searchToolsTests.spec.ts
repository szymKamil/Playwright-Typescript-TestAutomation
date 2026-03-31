import { test } from "@playwright/test";
import * as constans from "../../src/POM/ToolShop/utils/constans";
import { MainPage } from "../../src/POM/ToolShop/pages/mainPage";
import { SortingTypes } from "../../src/POM/ToolShop/components/SearchFilter";
import * as utils from "../../src/POM/ToolShop/utils/utils";
import { ProductCard } from "../../src/POM/ToolShop/components/ProductCard";

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
  await mainPage.categoryTree.pickBrandByName("ForgeFlex Tools");
  await mainPage.productList.openProductCardByIndex(utils.getRandomNum(0, 9));
  const productCard = new ProductCard(page);
  await productCard.assertProductBrand("ForgeFlex Tools");
  await productCard.exitCard();
  await mainPage.productList.openProductCardByIndex(utils.getRandomNum(0, 9));
  await productCard.assertProductBrand("ForgeFlex Tools");
});

test("Test price range", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.setPriceRange(70, 76);
  await mainPage.productList.findDisplayedProducts("Belt Sander");
});

test("Sorting test", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.sortBy(SortingTypes.NameAZ);
  await mainPage.search.sortBy(SortingTypes.NameZA);
});

test('Out of stock product test', async ({ page }) =>{
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.search('Long Nose Pliers');
  //await mainPage.productList
})


test('Assert that sustainability filter show only A and B rated products', async ({ page }) =>{
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.categoryTree.pickSustainabilityProducts();
  await mainPage.productList.loopThroughPagesAndPerformAction(async () => await mainPage.productList.assertProductsAreEco());
});