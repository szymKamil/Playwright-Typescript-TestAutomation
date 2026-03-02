import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import NavigationPage from "../../src/POM/BoniGarciaTestPage/pages/NavigationPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Navigation page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Navigation");
  const navigationPage = new NavigationPage(page);
  await navigationPage.verifyNavigationPage();
});
