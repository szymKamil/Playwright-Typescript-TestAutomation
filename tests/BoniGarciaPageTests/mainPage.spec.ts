import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Main page test - verification of visibility of elements", async ({
  mainPage,
}) => {
  await mainPage.verifyMainPageElements();
});
