import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Navigation page test", async ({ mainPage, navigationPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Navigation");
  await navigationPage.verifyNavigationPage();
  await navigationPage.openPage(3);
  let activePage = await navigationPage.getActivePage();
  console.log(`Active page is ${activePage}`);
  await navigationPage.openPage(1);
  activePage = await navigationPage.getActivePage();
  console.log(`Active page is ${activePage}`);
  await navigationPage.clickNext();
  activePage = await navigationPage.getActivePage();
  console.log(`Active page is ${activePage}`);
});
