import { test, expect } from "@playwright/test";
import * as constans from "../../src/POM/ToolShop/utils/constans";
import { MainPage } from "../../src/POM/ToolShop/pages/MainPage";
import { CategoriesOptions } from "../../src/POM/ToolShop/components/NavBar";
import { RentalsPage } from "../../src/POM/ToolShop/pages/RentalsPage";

test("Rental page tests", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  const rentalPage = new RentalsPage(page);
  await mainPage.navBar.pickCategory(CategoriesOptions.Rentals);
  await rentalPage.verifyRentalsPage();
});

test("Rental page tests with image interception", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  const rentalPage = new RentalsPage(page);
  await rentalPage.interceptImageRequests();
  await mainPage.navBar.pickCategory(CategoriesOptions.Rentals);
  await rentalPage.verifyRentalsPage("rentalsPageWithoutImages");
  await rentalPage.verifyImageInterception();
});

test("Rental page tests with image loaded", async ({ page }) => {
  await page.goto(constans.url);
    const rentalPage = new RentalsPage(page);
    await rentalPage.verifyImageLodaded();

});
