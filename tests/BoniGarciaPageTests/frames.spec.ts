import { fixture as test } from "./Fixture/boniGarciaFixture";
import { FramesPage } from "../../src/POM/BoniGarciaTestPage/pages/FramesPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Frame page test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Frames");
  const framesPage = new FramesPage(page);
  await framesPage.verifyParagraphsInFrame();
});
