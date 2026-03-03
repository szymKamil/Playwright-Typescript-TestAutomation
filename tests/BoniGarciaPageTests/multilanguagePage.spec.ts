import { fixture as test } from "./boniGarciaFixture.spec";
import { Multilanguage } from "../../src/POM/BoniGarciaTestPage/pages/Multilanguage";


test.beforeEach(async ({ mainPage }) => {
    await mainPage.openMainPage();
});

test('Multilanguage test', async ({ page, mainPage}) =>{
    await mainPage.openPage('Multilanguage');
    const multiLang = new Multilanguage(page);
    await multiLang.verifyMultilanguagePage();
});