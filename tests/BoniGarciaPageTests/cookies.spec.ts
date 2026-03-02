import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { CookiesPage } from "../../src/POM/BoniGarciaTestPage/pages/CookiesPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Cookies test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Cookies");
  const cookiesPage = new CookiesPage(page);
  await cookiesPage.displayCookies();
  await cookiesPage.printCookiesInfo();
  await cookiesPage.changeCookie(
    { name: "username ", value: " Jan Mariański" },
    { name: " data urodzenia ", value: " 1999.01.01 " },
  );
  await cookiesPage.displayCookies();
  await cookiesPage.printCookiesInfo();
});
