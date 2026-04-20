import { fixture as test } from "./Fixture/boniGarciaFixture";
import { ShadowDOM } from "../../src/POM/BoniGarciaTestPage/pages/ShadowDOM";


test("Shadow DOM test", async ({ mainPage, shadowDomPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Shadow DOM");
  await shadowDomPage.getTextFromShadowDOM();
});
