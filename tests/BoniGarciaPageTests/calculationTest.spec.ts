import { RandomCalculatorPage } from "../../src/POM/BoniGarciaTestPage/pages/RandomCalculatorPage";
import { fixture as test } from "./Fixture/boniGarciaFixture";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Calculation page test", async ({ mainPage, page }) => {
  await mainPage.openPage("Random calculator");
  const randomCalc = new RandomCalculatorPage(page);
  await randomCalc.setCorrectResultPercentage(20);
  await randomCalc.setRetries(4);
  for (let i = 0; i < 2; i++) {
    await randomCalc.sendMathOperation("1+4=");
    await randomCalc.sendMathOperation("12+44=");
    await randomCalc.sendMathOperation("11+23-45=");
    await randomCalc.sendMathOperation("24/2*4=");
    await randomCalc.sendMathOperation("90/9=");
  }
});
