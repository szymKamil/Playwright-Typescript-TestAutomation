import { fixture as test } from "./Fixture/boniGarciaFixture";


test("Frame page test", async ({ mainPage, framesPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Frames");
  await framesPage.verifyParagraphsInFrame();
});
