import { ProductItem, test } from "@fixtures/ui.fixture";

const products: ProductItem[] = [
  { name: "Bolt Cutters", quantity: 4 },
  { name: "Claw Hammer", quantity: 1 },
  { name: "Nuts and bolts", quantity: 100 },
  { name: "Construction Helmet", quantity: 1 },
];

test("Buy process", async ({ main, prepareCart }) => {
  await main.goto();
  await prepareCart(products);
  
});
