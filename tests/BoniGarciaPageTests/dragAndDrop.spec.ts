import { fixture as test } from "./Fixture/boniGarciaFixture";
import { DragAndDrop } from "../../src/POM/BoniGarciaTestPage/pages/DragAndDrop";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Drag and drop page test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Drag and drop");
  const dragAndDropPage = new DragAndDrop(page);
  await dragAndDropPage.dragAndDropPanel();
});
