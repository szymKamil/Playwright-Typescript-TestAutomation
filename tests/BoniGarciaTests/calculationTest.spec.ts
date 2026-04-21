import { fixture as test } from "./_fixture/boniGarciaFixture";

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

  //TODO: Metoda która losuje liczbę cyfr, losuje znaki arytmetycne, i oblicza wynik i porównuje go z kalkulatorem, jeśli jest błąd, to dorzuca do licznika ++, a następnie oblicza % poprawności i porównuje go z wstawionym w kalulator inputem dla % poprawnych
});
