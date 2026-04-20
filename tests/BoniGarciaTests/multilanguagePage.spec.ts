import { fixture as test } from "./Fixture/boniGarciaFixture";


test("Multilanguage test", async ({ multiLang, mainPage }) => {
  await mainPage.openPage("Multilanguage");
  await multiLang.verifyMultilanguagePage();
});
