import { fixture as test } from "./Fixture/boniGarciaFixture";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { WebStoragePage } from "../../src/POM/BoniGarciaTestPage/pages/WebStoragePage";


test("Web storage page test", async ({ mainPage, webStorage }) => {
  await mainPage.openMainPage();
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
