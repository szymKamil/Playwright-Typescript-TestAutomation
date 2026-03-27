import { Locator, Page} from "@playwright/test";

export class Rentals {
  readonly rentalProductCard: Locator;
  readonly rentalProductImage: Locator;
  readonly rentalProductTitle: Locator;
  readonly rentalProductCardText: Locator;

  constructor(page: Page) {
    this.rentalProductCard = page.getByRole('generic', {name=''});
    this.rentalProductImage = this.rentalProductCard.getByRole('img');
    this.rentalProductTitle = this.rentalProductCard.getByRole('heading');
    this.rentalProductCardText = this.rentalProductCard.getByRole('paragraph');
  }

  
}
