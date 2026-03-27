import { fixture as test } from "./Fixture/boniGarciaFixture";
import { DrawInCanvas } from "../../src/POM/BoniGarciaTestPage/pages/DrawInCanvas";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Draw in canvas page test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Draw in canvas");
  const drawInCanvas = new DrawInCanvas(page);
  await drawInCanvas.defaultDraw();
  await drawInCanvas.drawInCanvas(
    { x: 0, y: -30 },
    { x: 30, y: 30 },
    { x: -15, y: 30 },
    { x: 20, y: -60 },
  );
});
