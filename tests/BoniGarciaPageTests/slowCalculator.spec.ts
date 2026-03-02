import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { SlowCalculator } from "../../src/POM/BoniGarciaTestPage/pages/SlowCalculator";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Slow calculator", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Slow calculator");
  const slowCalculator = new SlowCalculator(page);
  await slowCalculator.setDelay(4);
  await slowCalculator.calculate("2+2*2-1");
});
