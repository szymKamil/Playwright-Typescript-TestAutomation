import { fixture as test } from "./boniGarciaFixture.ts";
import { MouseOverPage } from "../../src/POM/BoniGarciaTestPage/pages/MouseOverPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Mouse over page test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Mouse over");
  const mouseOverPage = new MouseOverPage(page);
  await mouseOverPage.mouseOverImg();
});
