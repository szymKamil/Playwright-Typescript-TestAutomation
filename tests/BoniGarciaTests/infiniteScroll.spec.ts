import { fixture as test } from "./Fixture/boniGarciaFixture";

test("Infinite scroll test", async ({ mainPage, infiniteScroll }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Infinite scroll");
  await infiniteScroll.scrollXtimes(5);
});
