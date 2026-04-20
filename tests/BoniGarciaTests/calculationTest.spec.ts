import { fixture as test } from "./Fixture/boniGarciaFixture";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Calculation page test", async ({ randomCalcPage }) => {
  await randomCalcPage.goto();
  await randomCalcPage.setCorrectResultPercentage(20);
  await randomCalcPage.verifyCorrectResultPrecentageInput(20);
  await randomCalcPage.setRetries(4);
  await randomCalcPage.verifyCInsertedNumOfRetries(4);
  for (let i = 0; i < 3; i++) {
    await randomCalcPage.sendMathOperation("1+4=");
    await randomCalcPage.sendMathOperation("12+44=");
    await randomCalcPage.sendMathOperation("11+23-45=");
    await randomCalcPage.sendMathOperation("24/2*4=");
    await randomCalcPage.sendMathOperation("90/9=");
  }
});
