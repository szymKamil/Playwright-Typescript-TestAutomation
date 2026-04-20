import { fixture as test } from "./Fixture/boniGarciaFixture";



test("Download file test", async ({ mainPage, downloadFiles }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Download files");
  await downloadFiles.downloadFile(1);
});
