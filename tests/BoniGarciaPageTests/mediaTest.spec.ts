import { fixture as test } from "./boniGarciaFixture.ts";
import { UserMediaPage } from "../../src/POM/BoniGarciaTestPage/pages/UserMediaPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Media playwer test", async ({ page, mainPage }) => {
  await mainPage.openPage("Get user media");
  const userMediaPage = new UserMediaPage(page);
  await userMediaPage.runMediaTest();
});
