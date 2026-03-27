import { Locator, Page } from "@playwright/test";
import { link } from "node:fs";

export class ProductCard {
  readonly cardImg: Locator;
  readonly cardProductName: Locator;
  readonly categoryTag: Locator;
  readonly cardPrice: Locator;
  readonly cardBadge: Locator;
  readonly cardDescription: Locator;
  readonly cardAmount: Locator;
  readonly cardIncreaseBtn: Locator;
  readonly cardDecreaseBtn: Locator;
  readonly cardAddToCartBtn: Locator;
  readonly cardAddToFavoritesBtn: Locator;
  readonly relatedProducts: Locator;
  readonly relatedProductsImg: Locator;
  readonly relatedProductsName: Locator;
  readonly relatedProductsMore: Locator;

  cosnstructor(page: Page) {
    this.cardImg = page.locator("img.figure-img");
    this.cardProductName = page.getByRole("heading");
    this.categoryTag = page.getByRole("generic", { name: "category" });
    this.cardPrice = page.getByRole("generic", { name: "unit-price" });
    this.cardBadge = page.locator("div[data-test='co2-rating-badge']");
    this.cardDescription = page.getByRole("paragraph");
    this.cardAmount = page.getByRole("spinbutton", { name: "Quantity" });
    this.cardIncreaseBtn = page.getByRole("button", {
      name: "Increase quantity",
    });
    this.cardDecreaseBtn = page.getByRole("button", {
      name: "Decrease quantity",
    });
    this.cardAddToCartBtn = page.getByRole("button", {
      name: "Add to cart",
    });
    this.cardAddToFavoritesBtn = page.getByRole("button", {
      name: "Add to favorites",
    });
    this.relatedProducts = page.getByRole("heading", {
      name: "Related products",
    });
    this.relatedProductsImg = page.locator("img.card-img-top");
    this.relatedProductsName = page.locator("h5.card-title");
    this.relatedProductsMore = page.getByRole("link", {
      name: "More information",
    });
  }
}
