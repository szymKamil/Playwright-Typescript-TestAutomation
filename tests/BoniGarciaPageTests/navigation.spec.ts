import { fixture as test } from "./Fixture/boniGarciaFixture";
import NavigationPage from "../../src/POM/BoniGarciaTestPage/pages/NavigationPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Navigation page test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Navigation");
  const navigationPage = new NavigationPage(page);
  await navigationPage.verifyNavigationPage();
});
