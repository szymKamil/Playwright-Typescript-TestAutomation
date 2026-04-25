import { fixture as test } from "./_fixture/boniGarciaFixture";

test("Download file test", async ({ mainPage, downloadFiles }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Download files");
  const pathForDowFile = await downloadFiles.downloadFile(1);
  //Erorr with saving file 
  await downloadFiles.verifyFileExist(pathForDowFile);
});
