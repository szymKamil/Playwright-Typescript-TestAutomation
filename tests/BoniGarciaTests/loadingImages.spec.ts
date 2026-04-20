import { fixture as test } from "./Fixture/boniGarciaFixture";


test("Wait for load images test", async ({ mainPage, loadingImagesPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Loading images");
  await loadingImagesPage.verifyLoadingImagesPageElements();
});
