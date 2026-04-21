import { fixture as test } from "./_fixture/boniGarciaFixture";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Main page test - verification of visibility of elements", async ({
  mainPage,
}) => {
  await mainPage.verifyMainPageElements();
  await mainPage.verifySnapshot();
});
