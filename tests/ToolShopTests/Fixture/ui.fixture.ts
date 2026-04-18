import { ProductList } from "src/POM/ToolShop/components/product-table-list";
import { test as base } from "./apiFixtures";

export interface ProductItem {
  name: string;
  quantity: number;
}

type UIFixtures = {
  credentials: {
    email: string;
    password: string;
  };
  loggUserUI: void;
  prepareCart: (items: ProductItem[]) => Promise<void>;
};

export const test = base.extend<UIFixtures>({
  loggUserUI: async ({ login, credentials }, use) => {
    await login.goto();
    console.log(credentials.email, credentials.password);
    await login.logIn(credentials.email, credentials.password);
    await use();
  },
  prepareCart: async ({ main, productCard }, use) => {
    await use(async (items: ProductItem[]) => {
      for (const item of items) {
        await main.search.search(item.name);
        await main.productList.openProductCardByName(item.name);
        await productCard.setQuantity(item.quantity);
        await productCard.addToCart();
        await productCard.exitCard();
      }
    });
  },
});
