import { fixture as test } from "./Fixture/boniGarciaFixture";


test("Mouse over page test", async ({ mainPage, mouseOverPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Mouse over");
  await mouseOverPage.mouseOverImg();
});
