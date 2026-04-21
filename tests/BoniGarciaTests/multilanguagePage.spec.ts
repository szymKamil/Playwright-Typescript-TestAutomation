import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Multilanguage test", async ({ multiLang, mainPage }) => {
  await mainPage.openPage("Multilanguage");
  await multiLang.verifyMultilanguagePage();
});
