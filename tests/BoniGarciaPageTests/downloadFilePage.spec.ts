import { fixture as test } from "./boniGarciaFixture.ts";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { IFramePage } from "../../src/POM/BoniGarciaTestPage/pages/iFramePage";
import { DownloadFilePage } from "../../src/POM/BoniGarciaTestPage/pages/DownloadFilePage.ts";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Download file test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Download files");
  const downloadFiles = new DownloadFilePage(page);
  await downloadFiles.downloadFile(1);
});
