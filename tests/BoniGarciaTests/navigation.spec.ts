import { fixture as test } from "./Fixture/boniGarciaFixture";

test("Navigation page test", async ({ mainPage, navigationPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Navigation");
  await navigationPage.verifyNavigationPage();
});
