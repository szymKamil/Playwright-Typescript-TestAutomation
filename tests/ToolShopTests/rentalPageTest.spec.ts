import { test } from "@fixtures/ui.fixture";
import { CategoriesOptions } from "../../src/POM/ToolShop/components/navbar";

test("Rental page tests", async ({ main, rental }) => {
  await main.goto();
  await main.navBar.pickCategory(CategoriesOptions.Rentals);
  await rental.verifyRentalsPage();
});

test("Rental page tests with image interception", async ({ main, rental }) => {
  await main.goto();
  await rental.interceptImageRequests();
  await main.navBar.pickCategory(CategoriesOptions.Rentals);
  await rental.verifyRentalsPage("rentalsPageWithoutImages");
  await rental.verifyImageInterception();
});

test("Rental page tests with image loaded", async ({ main, rental }) => {
  await main.goto();
  await rental.verifyImageLodaded();
});
