import { fixture as test } from "./_fixture/boniGarciaFixture";


test("iFrame page test", async ({ mainPage, iFramePage }) => {
  await mainPage.openMainPage();
  await mainPage.openMainPage();
  await mainPage.openPage("IFrames");
  await iFramePage.scrollToLastParagraph();
  
});
