import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Slow calculator", async ({ mainPage, slowCalculator }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Slow calculator");
  await slowCalculator.setDelay(6);
  const timeStart = performance.now();
  await slowCalculator.calculate("2+2*2-1");
  const timeStop = performance.now();
  const duration = timeStop - timeStart;
  console.log(`Czas oczekiwania na wynik to ${duration} ms`);
  await slowCalculator.verifyResult(5);
});
