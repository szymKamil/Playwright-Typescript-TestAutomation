import { expect, fixture as test } from "./_fixture/boniGarciaFixture";

test("Long page test", async ({ mainPage, longPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Long page");
  const startingHeight = await longPage.getViewportHeight();
  await longPage.verifyNumberOfParagraphs();
  await longPage.scrollToBottomParagraph();
  const endHeight = await longPage.getViewportHeight();
  expect(startingHeight).not.toEqual(endHeight);
  console.log(`Starting scroll position is ${startingHeight}, and endig scroll position is ${endHeight}`);
});
