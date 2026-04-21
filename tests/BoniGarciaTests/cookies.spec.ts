import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Cookies test", async ({ mainPage, cookiesPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Cookies");
  await cookiesPage.displayCookies();
  await cookiesPage.printCookiesInfo();
  await cookiesPage.changeCookie(
    { name: "username", value: "Jan Mariański" },
    { name: "data urodzenia", value: "1999.01.01" },
  );
  await cookiesPage.displayCookies();
  await cookiesPage.printCookiesInfo();
});
