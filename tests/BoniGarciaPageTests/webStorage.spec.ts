import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { WebStoragePage } from "../../src/POM/BoniGarciaTestPage/pages/WebStoragePage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Web storage page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  const webStorage = new WebStoragePage(page);
  await webStorage.modifySessionStorage(
    { key: "grażyna", value: "kowalska" },
    { key: "łukasz", value: "zboralski" },
  );
  await mainPage.openPage("Web storage");
  await webStorage.modifyLocalStorage(
    { key: "janusz", value: "kowalski" },
    { key: "marcin", value: "daniec" },
  );
  await webStorage.openLocalStorage();
  await webStorage.openSessionStorage();
});
