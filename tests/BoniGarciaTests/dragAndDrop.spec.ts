import { fixture as test } from "./Fixture/boniGarciaFixture";

test("Drag and drop page test", async ({ mainPage, dragAndDropPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Drag and drop");
  await dragAndDropPage.dragAndDropPanel();
});
