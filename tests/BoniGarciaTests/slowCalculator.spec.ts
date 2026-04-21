import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Slow calculator", async ({ mainPage, slowCalculator }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Slow calculator");
  await slowCalculator.setDelay(4);
  await slowCalculator.calculate("2+2*2-1");
});
