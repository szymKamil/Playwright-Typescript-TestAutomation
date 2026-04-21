import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Shadow DOM test", async ({ mainPage, shadowDomPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Shadow DOM");
  await shadowDomPage.getTextFromShadowDOM();
  await shadowDomPage.verifyShadowText("Hello Shadow DOM");
});
