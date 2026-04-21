import { faker } from "@faker-js/faker/locale/en";
import { fixture as test } from "./_fixture/boniGarciaFixture";

const testData = {
  textInput: faker.string.sample({ min: 4, max: 10 }),
  password: faker.internet.password({ length: 10 }),
  textArea: faker.string.sample({ min: 10, max: 20 }),
  color: "#2e30c4",
  date: new Date(Date.now()).toISOString(),
};

test.describe("Test is validating main elements of Web Form Page", () => {
  test("Web form test", async ({ mainPage, webForm }) => {
    await mainPage.goto();
    await mainPage.openPage("Web form");
    await webForm.fillTextInput(testData.textInput);
    await webForm.verifyTextInput(testData.textInput);
    await webForm.fillPassword(testData.password);
    await webForm.verifyPasswordInput(testData.password);
    await webForm.fillTextArea(testData.textArea);
    await webForm.verifyTextAreaInput(testData.textArea);
    await webForm.selectFromDropdown("Two");
    await webForm.verifyDropdownOption("2");
    await webForm.selectFromDatalist("Chicago");
    await webForm.verifyDataListOption("Chicago");
    await webForm.uploadFile();
    await webForm.verifyFileIsUploaded();
    await webForm.pickCheckbox(1, false);
    await webForm.pickCheckbox(2, true);
    await webForm.verifyCheckboxChecked(1);
    await webForm.pickRadio(2);
    await webForm.verifyRadioChecked(2);
    await webForm.pickColor(testData.color);
    await webForm.verifyColor(testData.color);
    await webForm.pickDate(testData.date);
    await webForm.verifyDate(testData.date);
    await webForm.pickRange(2);
    await webForm.verifySliderValue(2);
    await webForm.sendForm();
    await webForm.verifySucessOfSubmitForm();
  });
});
