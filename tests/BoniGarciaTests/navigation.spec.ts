import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Navigation page test", async ({ mainPage, navigationPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Navigation");
  await navigationPage.verifyNavigationPage();
});
