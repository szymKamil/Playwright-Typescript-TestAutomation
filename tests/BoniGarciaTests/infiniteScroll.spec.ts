import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Infinite scroll test", async ({ mainPage, infiniteScroll }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Infinite scroll");
  await infiniteScroll.scrollXtimes(5);
});
