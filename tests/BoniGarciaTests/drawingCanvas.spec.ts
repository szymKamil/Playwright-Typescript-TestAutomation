import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Draw in canvas page test", async ({ mainPage, drawInCanvasPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Draw in canvas");
  await drawInCanvasPage.defaultDraw();
  await drawInCanvasPage.drawInCanvas(
    { x: 0, y: -30 },
    { x: 30, y: 30 },
    { x: -15, y: 30 },
    { x: 20, y: -60 },
  );
  await drawInCanvasPage.visulatTest();
});
