import { fixture as test } from "./_fixture/boniGarciaFixture";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { WebStoragePage } from "../../src/POM/BoniGarciaTestPage/pages/WebStoragePage";

const sessionData: Array<{ key: string; value: string }> = [
  { key: "grażyna", value: "kowalska" },
  { key: "łukasz", value: "zboralski" },
];

const localStorageData: Array<{ key: string; value: string }> = [
  { key: "janusz", value: "kowalski" },
  { key: "marcin", value: "daniec" },
];

test("Web storage page test", async ({ mainPage, webStorage }) => {
  await mainPage.openMainPage();
  await webStorage.modifySessionStorage(sessionData);
  await mainPage.openPage("Web storage");
  await webStorage.modifyLocalStorage(localStorageData);
  await webStorage.openLocalStorage();
  await webStorage.verifyLocalStorage(localStorageData);
  await webStorage.openSessionStorage();
  await webStorage.verifySessionStorage(sessionData);
});
