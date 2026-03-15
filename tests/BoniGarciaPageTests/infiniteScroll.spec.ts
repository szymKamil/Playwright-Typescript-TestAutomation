import { fixture as test } from "./boniGarciaFixture.ts";
import { InfiniteScrollPage } from "../../src/POM/BoniGarciaTestPage/pages/InfiniteScrollPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Infinite scroll test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Infinite scroll");
  const infiniteScroll = new InfiniteScrollPage(page);
  await infiniteScroll.scrollXtimes(5);
});
