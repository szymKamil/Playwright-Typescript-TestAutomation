import { fixture as test } from "./_fixture/boniGarciaFixture";
import {
  AlertParameter
} from "../../src/POM/BoniGarciaTestPage/pages/DialogBoxesPage";

test("Dialog boxex page test", async ({ mainPage, dialogBoxesPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Dialog boxes");
  await dialogBoxesPage.launchAlert();
  await dialogBoxesPage.launchConfirm(AlertParameter.Accept);
  await dialogBoxesPage.launchPromt(
    AlertParameter.Accept,
    "Test string in prompt alert",
  );
  await dialogBoxesPage.launchModal(AlertParameter.Accept);
});
