import { fixture as test } from "./Fixture/boniGarciaFixture";


test("Long page test", async ({ mainPage, longPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Long page");
  await longPage.verifyNumberOfParagraphs();
  await longPage.scrollToBottomParagraph();
});
