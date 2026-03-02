import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { MouseOverPage } from "../../src/POM/BoniGarciaTestPage/pages/MouseOverPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Mouse over page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Mouse over");
  const mouseOverPage = new MouseOverPage(page);
  await mouseOverPage.mouseOverImg();
});
