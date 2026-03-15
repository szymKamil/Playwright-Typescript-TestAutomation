import { fixture as test } from "./boniGarciaFixture.ts";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { ShadowDOM } from "../../src/POM/BoniGarciaTestPage/pages/ShadowDOM";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Shadow DOM test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Shadow DOM");
  const shadowDomPage = new ShadowDOM(page);
  await shadowDomPage.getTextFromShadowDOM();
});
