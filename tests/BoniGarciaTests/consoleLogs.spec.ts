import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Console logs test", async ({ consoleLogPage, mainPage }) => {
  await mainPage.openMainPage();
  consoleLogPage.listenLogs();
  await mainPage.openPage("Console logs");
  await consoleLogPage.printLogs();
});
