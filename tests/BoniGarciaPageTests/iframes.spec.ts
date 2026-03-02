import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { IFramePage } from "../../src/POM/BoniGarciaTestPage/pages/iFramePage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("iFrame page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("IFrames");
  const iFramePage = new IFramePage(page);
  await iFramePage.scrollToLastParagraph();
});
