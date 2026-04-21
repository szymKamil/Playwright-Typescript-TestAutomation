import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Wait for load images test", async ({ mainPage, loadingImagesPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Loading images");
  await loadingImagesPage.verifyLoadingImagesPageElements();
});
