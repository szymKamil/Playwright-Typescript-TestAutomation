import { fixture as test } from "./_fixture/boniGarciaFixture";


const data = [{ name: "username", value: "Jan Mariański" },
    { name: "data urodzenia", value: "1999.01.01" }];

test("Cookies test", async ({ mainPage, cookiesPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Cookies");
  await cookiesPage.displayCookies();
  await cookiesPage.verifyCookies({name: "name", value: "John Doe"}, {name: 'date', value: '10/07/2018'});
  await cookiesPage.changeCookie(...data);
  await cookiesPage.displayCookies();
  await cookiesPage.verifyCookies(...data);
});
