import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { InfiniteScrollPage } from "../../src/POM/BoniGarciaTestPage/pages/InfiniteScrollPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Infinite scroll test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Infinite scroll");
  const infiniteScroll = new InfiniteScrollPage(page);
  await infiniteScroll.scrollXtimes(5);
});
