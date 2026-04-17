import { test } from "@fixtures/ui.fixture";
import { SortingTypes } from "../../src/POM/ToolShop/components/search-filter";
import * as utils from "../../src/POM/ToolShop/utils/utils";
import { CategoriesOptions } from "../../src/POM/ToolShop/components/navbar";

test("Search test", async ({ main }) => {
  await main.goto();
  await main.search.search("Hammer");
  await main.productList.checkDisplayedProducts("hammer");
});

test("Filter test by category", async ({ main }) => {
  await main.goto();
  await main.categoryTree.pickCategoryByName("Saw");
  await main.productList.checkDisplayedProducts("Saw");
});

test("Filter test by brand", async ({ main, productCard }) => {
  await main.goto();
  await main.categoryTree.pickBrandByName("ForgeFlex Tools");
  await main.productList.openProductCardByIndex(utils.getRandomNum(0, 9));
  await productCard.assertProductBrand("ForgeFlex Tools");
  await productCard.exitCard();
  await main.productList.openProductCardByIndex(utils.getRandomNum(0, 9));
  await productCard.assertProductBrand("ForgeFlex Tools");
});

test("Test price range", async ({ main }) => {
  test.slow();
   
  await main.goto();
  await main.search.setPriceRange(70, 76);
  await main.productList.checkDisplayedProducts("Belt Sander");
});

test("Sorting test", async ({ main }) => {
  await main.goto();
  await main.search.sortBy(SortingTypes.NameAZ);
  await main.search.sortBy(SortingTypes.NameZA);
});

//TODO: weryfikacja ceny
// test("Sorting test", async ({ main }) => {
//    await main.goto();
//   const main = new MainPage(page);
//   await main.search.sortBy(SortingTypes.PriceLowHigh);
// });

test("Out of stock product test", async ({ main }) => {
  await main.goto();
  await main.search.search("Long Nose Pliers");
  await main.productList.isProductOutOfStock("Long Nose Pliers");
});

test("Assert that sustainability filter show only A and B rated products", async ({
  main,
}) => {
  await main.goto();
  await main.categoryTree.pickSustainabilityProducts();
  await main.productList.loopThroughPagesAndPerformAction(
    async () => await main.productList.assertProductsAreEco(),
  );
});

test("Filter by price range between 190 and 200", async ({ main }) => {
  await main.goto();
  await main.search.setPriceRange(190, 200);
  await main.productList.checkDisplayedProducts(0);
});

test.fail("Failed search test", async ({ main }) => {
  await main.goto();
  await main.search.search("sas24tfgfdb");
  await main.productList.checkDisplayedProducts("pliers");
});

test("Filter test category and brand", async ({ main, productCard }) => {
  await main.goto();
  await main.categoryTree.pickCategoryByName("Pliers");
  await main.categoryTree.pickBrandByName("MightyCraft Hardware");
  await main.productList.openProductCardByIndex(utils.getRandomNum(0, 3));
  await productCard.assertProductBrand("MightyCraft Hardware");
  await productCard.exitCard();
});

test("Filter by category and changing page", async ({ main }) => {
  await main.goto();
  await main.categoryTree.pickCategoryByName("Screwdriver");
  await main.productList.checkDisplayedProducts("Screwdriver");
  await main.navBar.pickCategory(CategoriesOptions.HandTools);
  await main.categoryTree.isCategorySelected("Screwdriver", false);
});

test("Open empty category", async ({ main }) => {
  await main.goto();
  await main.navBar.pickCategory(CategoriesOptions.SpecialTools);
  await main.productList.verifyProductListIsEmpty();
});

test("Brand category filter test", async ({ main }) => {
  await main.goto();
  await main.categoryTree.assertBrandFilterContain2Options();
});

test("Page changing", async ({ main }) => {
  await main.goto();
  await main.productList.changePage(2);
  await main.productList.getActivePage();
});
