import { fixture as test } from "./boniGarciaFixture.ts";
import WebForm from "../../src/POM/BoniGarciaTestPage/pages/WebFormPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test.describe("Test is validating main elements of Web Form Page", () => {
  test("Web form test", async ({ mainPage, page }) => {
    await mainPage.openPage("Web form");
    const webForm = new WebForm(page);
    //TODO: Poprawka w arialabel 
    //await webForm.verifyWebFormPageElements(); 
    await webForm.fillTextInput();
    await webForm.fillPassword();
    await webForm.fillTextArea();
    await webForm.selectFromDropdown("Two");
    await webForm.selectFromDatalist("Chicago");
    await webForm.uploadFile();
    await webForm.pickCheckbox(1, false);
    await webForm.pickCheckbox(2, true);
    await webForm.pickRadio(2);
    await webForm.pickColor("#2e30c4");
    await webForm.pickDate();
    await webForm.pickRange(2);
    await webForm.sendForm();
  });
});
