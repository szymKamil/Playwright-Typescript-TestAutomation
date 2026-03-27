import { fixture as test } from "./Fixture/boniGarciaFixture";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import {
  AlertParameter,
  DialgBoxesPage,
} from "../../src/POM/BoniGarciaTestPage/pages/DialogBoxesPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Dialog boxex page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Dialog boxes");
  const dialogBoxesPage = new DialgBoxesPage(page);
  await dialogBoxesPage.launchAlert();
  await dialogBoxesPage.launchConfirm(AlertParameter.Accept);
  await dialogBoxesPage.launchPromt(
    AlertParameter.Accept,
    "Test string in prompt alert",
  );
  await dialogBoxesPage.launchModal(AlertParameter.Accept);
});
