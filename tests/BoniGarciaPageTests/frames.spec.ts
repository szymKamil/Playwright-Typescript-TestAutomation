import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { FramesPage } from "../../src/POM/BoniGarciaTestPage/pages/FramesPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Frame page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Frames");
  const framesPage = new FramesPage(page);
  await framesPage.verifyParagraphsInFrame();
});
