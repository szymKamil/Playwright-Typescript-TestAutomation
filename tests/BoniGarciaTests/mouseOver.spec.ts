import { IMAGES } from "src/POM/BoniGarciaTestPage/pages/MouseOverPage";
import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Mouse over page test", async ({ mainPage, mouseOverPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Mouse over");
  await mouseOverPage.mouseOverImg(IMAGES.Award);
  await mouseOverPage.verifyCaption(IMAGES.Award);
  await mouseOverPage.mouseOverImg(IMAGES.Landscape);
  await mouseOverPage.verifyCaption(IMAGES.Landscape);
  await mouseOverPage.mouseOverImg(IMAGES.Calendar);
  await mouseOverPage.verifyCaption(IMAGES.Calendar);
});
