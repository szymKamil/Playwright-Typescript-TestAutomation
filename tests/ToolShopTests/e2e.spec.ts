import { test } from "@fixtures/ui.fixture";

test("Buy process", async ({ main, prepareCart }) => {
  await main.goto();
  await prepareCart([
    { name: "Bolt Cutters", quantity: 4 },
    { name: "Claw Hammer", quantity: 1 },
  ]);
  //rest
});
