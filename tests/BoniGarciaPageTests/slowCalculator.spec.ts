import { fixture as test } from "./boniGarciaFixture.ts";
import { SlowCalculator } from "../../src/POM/BoniGarciaTestPage/pages/SlowCalculator";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Slow calculator", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Slow calculator");
  const slowCalculator = new SlowCalculator(page);
  await slowCalculator.setDelay(4);
  await slowCalculator.calculate("2+2*2-1");
});
