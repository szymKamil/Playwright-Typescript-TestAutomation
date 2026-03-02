import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { LoadingImagesPage } from "../../src/POM/BoniGarciaTestPage/pages/LoadingImagesPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Wait for load images test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Loading images");
  const loadingImagesPage = new LoadingImagesPage(page);
  await loadingImagesPage.verifyLoadingImagesPageElements();
});
