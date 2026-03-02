import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { LongPage } from "../../src/POM/BoniGarciaTestPage/pages/LongPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Long page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Long page");
  const longPage = new LongPage(page);
  await longPage.verifyNumberOfParagraphs();
  await longPage.scrollToBottomParagraph();
});
