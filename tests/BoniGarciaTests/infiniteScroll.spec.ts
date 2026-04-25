import { fixture as test, expect } from "./_fixture/boniGarciaFixture";

test("Infinite scroll test", async ({ mainPage, infiniteScroll }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Infinite scroll");
  const startingViewport = await infiniteScroll.getViewport();
  await infiniteScroll.scrollXtimes(5);
  const endingViewport = await infiniteScroll.getViewport();
  expect(startingViewport).not.toEqual(endingViewport);
  console.log(
    `Starting viewport is ${startingViewport}, ending viewport is ${endingViewport}`,
  );
});
