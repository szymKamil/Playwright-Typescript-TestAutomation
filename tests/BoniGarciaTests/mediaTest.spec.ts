import { fixture as test } from "./Fixture/boniGarciaFixture";


test("Media playwer test", async ({ mainPage, userMediaPage }) => {
  await mainPage.openPage("Get user media");
  await userMediaPage.runMediaTest();
});
