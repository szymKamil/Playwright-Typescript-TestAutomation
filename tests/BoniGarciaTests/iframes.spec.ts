import { fixture as test } from "./_fixture/boniGarciaFixture";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("iFrame page test", async ({ mainPage, iFramePage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("IFrames");
  await iFramePage.scrollToLastParagraph();
});
