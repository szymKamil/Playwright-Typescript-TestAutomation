import { fixture as test } from "./boniGarciaFixture.ts";
import { LongPage } from "../../src/POM/BoniGarciaTestPage/pages/LongPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Long page test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Long page");
  const longPage = new LongPage(page);
  await longPage.verifyNumberOfParagraphs();
  await longPage.scrollToBottomParagraph();
});
