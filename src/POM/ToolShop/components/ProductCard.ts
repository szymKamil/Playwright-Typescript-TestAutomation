import { expect, Locator, Page } from "@playwright/test";

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

  constructor(page: Page) {
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

  async assertProductCardContainInfo(name?: string, price?: string) {
    await expect(this.cardImg).toBeVisible();
    if (name) {
      await expect(this.cardProductName).toContainText(name);
    } else {
      await expect(this.cardProductName).toBeVisible();
    }
    expect(this.categoryTag.count).toBeGreaterThan(0);
    if (price) {
      await expect(this.cardPrice).toContainText(price);
    } else {
      await expect(this.cardPrice).toBeVisible();
    }
    await expect(this.cardBadge).toBeVisible();
    await expect(this.cardIncreaseBtn).toBeVisible();
    await expect(this.cardDecreaseBtn).toBeVisible();
    await expect(this.cardAmount).toHaveValue("1");
    await expect(this.cardAddToCartBtn).toBeVisible();
    await expect(this.cardAddToFavoritesBtn).toBeVisible();
    expect(this.relatedProducts.count).toBeGreaterThan(0);
  }
}
