import { ConsoleLogsPage } from "../../src/POM/BoniGarciaTestPage/pages/ConsoleLogsPage";
import { fixture as test } from "./boniGarciaFixture.ts";



test.beforeEach(async ({mainPage}) =>{
    await mainPage.openMainPage();
});

test('Console logs test', async ({page, mainPage}) =>{
    const consoleLogsPage = new ConsoleLogsPage(page);
    consoleLogsPage.listenLogs();
    await mainPage.openPage('Console logs');
    await consoleLogsPage.printLogs();
})