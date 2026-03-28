import { expect, Locator, Page } from "@playwright/test";

export class ProductList{
  readonly productListCard: Locator;
  readonly productImg: Locator;
  readonly productName: Locator;
  readonly productBadge: Locator;
  readonly productPrice: Locator;
  readonly productStockStatus: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    this.productListCard = page.locator('a.card');
    this.productName = this.productListCard.getByRole('heading');
    this.productImg = this.productListCard.getByRole('img');
    this.productBadge = this.productListCard.locator('div.co2-rating-scale');
    this.productPrice = this.productListCard.locator("span[data-test='product-price']");
    this.productStockStatus = this.productListCard.locator("span[data-test='out-of-stock']");
    this.pagination = page.locator('ul.pagination');
  }

  // ====== Functions ======
  async getNumOfDisplayedProducts(): Promise<number>{
    return await this.productListCard.count();
  }

  async findDisplayedProducts(productName: string){
   for (let i = 0; i < (await this.productListCard.count()); i++){
      await expect(this.productName.nth(i)).toContainText(new RegExp(productName, 'i'));
   }

  }



}
