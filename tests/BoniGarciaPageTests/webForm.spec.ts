import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import WebForm from "../../src/POM/BoniGarciaTestPage/pages/WebFormPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Web form test", async ({ mainPage, page }) => {
  await mainPage.openPage("Web form");
  const webForm = new WebForm(page);
  await webForm.verifyWebFormPageElements();
  await webForm.fillWebForm({ range: 0 });
  await webForm.sendForm();
});
