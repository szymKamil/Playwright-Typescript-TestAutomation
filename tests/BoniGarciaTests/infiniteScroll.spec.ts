import { fixture as test, expect } from "./_fixture/boniGarciaFixture";

test("Infinite scroll test", async ({ mainPage, infiniteScroll }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Infinite scroll");
  const startingScrollPos = await infiniteScroll.getScrollPos();
  await infiniteScroll.scrollXtimes(5);
  const endingScrollPos = await infiniteScroll.getScrollPos();
  expect(startingScrollPos).not.toEqual(endingScrollPos);
  console.log(
    `Starting scroll pos is ${startingScrollPos}, ending scroll pos is ${endingScrollPos}`,
  );
});
