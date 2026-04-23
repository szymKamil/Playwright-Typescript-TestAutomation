import { fixture as test } from "./_fixture/boniGarciaFixture";
import { LanguageData } from "../../src/POM/BoniGarciaTestPage/pages/Multilanguage";

const langTestData: LanguageData = {
  homeParagraph: "Inicio",
  contentParagraph: "Contenido",
  aboutPara: "Acerca de",
  contactPara: "Contacto",
};

test("Multilanguage test", async ({ multiLang, mainPage }) => {
  await mainPage.openPage("Multilanguage");
  await multiLang.verifyMultilanguagePage(langTestData);
});
