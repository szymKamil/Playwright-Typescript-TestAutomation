import { fixture as test } from "./boniGarciaFixture.ts";
import { LoadingImagesPage } from "../../src/POM/BoniGarciaTestPage/pages/LoadingImagesPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Wait for load images test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Loading images");
  const loadingImagesPage = new LoadingImagesPage(page);
  await loadingImagesPage.verifyLoadingImagesPageElements();
});
