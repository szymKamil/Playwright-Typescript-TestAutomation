import { fixture as test } from "./Fixture/boniGarciaFixture";



test.describe("Test is validating main elements of Web Form Page", () => {
  test("Web form test", async ({ mainPage, webForm }) => {
    await mainPage.openPage("Web form");
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
