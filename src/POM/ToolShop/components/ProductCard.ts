import { Locator, Page } from "@playwright/test";

export class ProductCard {
  readonly cardImg: Locator;
  readonly categoryTag: Locator;
  readonly cardPrice: Locator;
  readonly cardBadge: Locator;
  readonly cardDescription: Locator;
  readonly cardAmount: Locator;
  readonly cardAddBtn: Locator;
  readonly cardDecreaseBtn: Locator;
  readonly cardAddToCartBtn: Locator;
  readonly cardAddToFavoritesBtn: Locator;
  readonly relatedProducts: Locator;
  readonly relatedProductsImg: Locator;
  readonly relatedProductsName: Locator;
  readonly relatedProductsMore: Locator;

  cosnstructor(page: Page) {
    this.cardImg = page.getByRole();
    this.categoryTag = page.getByRole();
    this.cardPrice = page.getByRole();
    this.cardBadge = page.getByRole();
    this.cardDescription = page.getByRole();
    this.cardAmount = page.getByRole();
    this.cardAddBtn = page.getByRole();
    this.cardDecreaseBtn = page.getByRole();
    this.cardAddToCartBtn = page.getByRole();
    this.cardAddToFavoritesBtn = page.getByRole();
    this.relatedProducts = page.getByRole();
    this.relatedProductsImg = page.getByRole();
    this.relatedProductsName = page.getByRole();
    this.relatedProductsMore = page.getByRole();
  }
}
