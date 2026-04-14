import { test } from "@playwright/test";
import * as constans from "../../src/POM/ToolShop/utils/constans";
import { MainPage } from "../../src/POM/ToolShop/pages/MainPage";
import { SortingTypes } from "../../src/POM/ToolShop/components/SearchFilter";
import * as utils from "../../src/POM/ToolShop/utils/utils";
import { ProductCard } from "../../src/POM/ToolShop/components/ProductCard";
import { CategoriesOptions } from "../../src/POM/ToolShop/components/NavBar";

test("Search test", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.search("Hammer");
  await mainPage.productList.checkDisplayedProducts("hammer");
});

test("Filter test by category", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.categoryTree.pickCategoryByName("Saw");
  await mainPage.productList.checkDisplayedProducts("Saw");
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
  await mainPage.productList.checkDisplayedProducts("Belt Sander");
});

test("Sorting test", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.sortBy(SortingTypes.NameAZ);
  await mainPage.search.sortBy(SortingTypes.NameZA);
});

//TODO: weryfikacja ceny 
// test("Sorting test", async ({ page }) => {
//   await page.goto(constans.url);
//   const mainPage = new MainPage(page);
//   await mainPage.search.sortBy(SortingTypes.PriceLowHigh);

//   await mainPage.search.sortBy(SortingTypes.PriceLowHigh);
// });

test("Out of stock product test", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.search("Long Nose Pliers");
  await mainPage.productList.isProductOutOfStock("Long Nose Pliers");
});

test("Assert that sustainability filter show only A and B rated products", async ({
  page,
}) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.categoryTree.pickSustainabilityProducts();
  await mainPage.productList.loopThroughPagesAndPerformAction(
    async () => await mainPage.productList.assertProductsAreEco(),
  );
});

test("Filter by price range between 190 and 200", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.setPriceRange(190, 200);
  await mainPage.productList.checkDisplayedProducts(0);
});


test.fail("Failed search test", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.search.search("sas24tfgfdb");
  await mainPage.productList.checkDisplayedProducts("pliers");
});


test("Filter test category and brand", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.categoryTree.pickCategoryByName("Pliers");
  await mainPage.categoryTree.pickBrandByName("MightyCraft Hardware");
  await mainPage.productList.openProductCardByIndex(utils.getRandomNum(0, 3));
  const productCard = new ProductCard(page);
  await productCard.assertProductBrand("MightyCraft Hardware");
  await productCard.exitCard();
});

test('Filter by category and changing page', async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.categoryTree.pickCategoryByName("Screwdriver");
  await mainPage.productList.checkDisplayedProducts("Screwdriver");
  await mainPage.navBar.pickCategory(CategoriesOptions.HandTools);
  await mainPage.categoryTree.isCategorySelected("Screwdriver", false);
})