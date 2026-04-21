import { fixture as test } from "./_fixture/boniGarciaFixture";
import { ShadowDOM } from "../../src/POM/BoniGarciaTestPage/pages/ShadowDOM";

test("Shadow DOM test", async ({ mainPage, shadowDomPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Shadow DOM");
  await shadowDomPage.getTextFromShadowDOM();
});
