import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { DragAndDrop } from "../../src/POM/BoniGarciaTestPage/pages/DragAndDrop";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Drag and drop page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Drag and drop");
  const dragAndDropPage = new DragAndDrop(page);
  await dragAndDropPage.dragAndDropPanel();
});
