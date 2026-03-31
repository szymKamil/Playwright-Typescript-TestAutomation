import { expect, Locator, Page } from "@playwright/test";

export class ProductList {
  readonly productListCard: Locator;
  readonly productImg: Locator;
  readonly productName: Locator;
  readonly productBadge: Locator;
  readonly productPrice: Locator;
  readonly productStockStatus: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    this.productListCard = page.locator("a.card");
    this.productName = this.productListCard.getByRole("heading");
    this.productImg = this.productListCard.getByRole("img");
    this.productBadge = this.productListCard.locator("div.co2-rating-scale");
    this.productPrice = this.productListCard.locator(
      "span[data-test='product-price']",
    );
    this.productStockStatus = this.productListCard.locator(
      "span[data-test='out-of-stock']",
    );
    this.pagination = page.locator("ul.pagination");
  }

  // ====== Functions ======

  async changePage(pageNumber: number) {
    await this.pagination
      .getByRole("link", { name: pageNumber.toString() })
      .click();
  }

  async loopThroughPagesAndPerformAction(func: Function) {
    const pageCount = await this.pagination.getByRole("button").count();
    for (let i = 0; i < pageCount; i++) {
      const btn = this.pagination.getByText(new RegExp(/^${i + 1}$/));
      if (await btn.isVisible()) {
        await btn.click();
        await func();
      }
    }
  }

  async getNumOfDisplayedProducts(): Promise<number> {
    return await this.productListCard.count();
  }

  async findDisplayedProducts(productName: string) {
    for (let i = 0; i < (await this.productListCard.count()); i++) {
      await expect(this.productName.nth(i)).toContainText(
        new RegExp(productName, "i"),
      );
    }
  }

  private async getProductStockStatus(product: Locator) {
    return (await product.locator("span[data-test='out-of-stock']").isVisible())
      ? "Out of stock"
      : "In stock";
  }

  async openProductCardByName(productName: string) {
    await this.productListCard.filter({ hasText: productName }).first().click();
  }
  async openProductCardByIndex(index: number) {
    await this.productListCard.nth(index).click();
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return (await this.productName.nth(index).textContent()) ?? "";
  }

  async getProductPriceByIndex(index: number): Promise<string> {
    return (await this.productPrice.nth(index).textContent()) ?? "";
  }

  async isProductOutOfStock(name: string): Promise<boolean> {
    const productCard = this.productListCard.filter({ hasText: name }).first();
    return (
      (await productCard.isVisible()) &&
      (await this.getProductStockStatus(productCard)) === "Out of stock"
    );
  }

  async assertProductsAreEco() {
    for (let i = 0; i < (await this.productListCard.count()); i++) {
      const badgeText =
        (await this.productBadge
          .nth(i)
          .locator("span.co2-letter.active")
          .textContent()) ?? "";
      expect(badgeText).toMatch(/[AB]/);
    }
  }
}
