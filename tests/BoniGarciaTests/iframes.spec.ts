import { waitForDebugger } from "node:inspector";
import { fixture as test } from "./_fixture/boniGarciaFixture";

test("iFrame page test", async ({ mainPage, iFramePage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("IFrames");
  const startingScrollPos = await iFramePage.getScrollPos();
  await iFramePage.scrollToLastParagraph();
  const endingScrollPos = await iFramePage.getScrollPos();
  console.log(
    `Starting scroll position is ${startingScrollPos}, ending scroll position is ${endingScrollPos}`,
  );
});
