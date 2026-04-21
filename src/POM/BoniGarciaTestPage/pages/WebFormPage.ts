import { Page, Locator, expect } from "@playwright/test";
import { Actions } from "../../../_Tools/Actions";
import { Logger } from "../../../_Tools/Logger";
import { faker } from "@faker-js/faker";
import path from "node:path";

export default class WebForm {
  private readonly actions: Actions;
  private readonly mainHeader: Locator;
  private readonly page: Page;
  private readonly logoImg: Locator;
  private readonly pageTitle: Locator;
  private readonly container1: Locator;
  private readonly container2: Locator;
  private readonly container3: Locator;
  private readonly textInput: Locator;
  private readonly passwordInput: Locator;
  private readonly textArea: Locator;
  private readonly disabledInput: Locator;
  private readonly readonlyInput: Locator;
  private readonly dropdownSelect: Locator;
  private readonly dropdownDatalist: Locator;
  private readonly fileInput: Locator;
  private readonly checkedCheckbox: Locator;
  private readonly defaultCheckbox: Locator;
  private readonly checkedRadio: Locator;
  private readonly defaultRadio: Locator;
  private readonly colorPicker: Locator;
  private readonly datePicker: Locator;
  private readonly rangePicker: Locator;
  private readonly submitBtn: Locator;
  private readonly submitedMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.mainHeader = page.locator("h1.display-4");
    this.logoImg = page.locator("img.img-fluid");
    this.pageTitle = page.getByText("Web form");
    this.container1 = page.locator("div.col-md-4.py-2").nth(0);
    this.container2 = page.locator("div.col-md-4.py-2").nth(1);
    this.container3 = page.locator("div.col-md-4.py-2").nth(2);
    this.textInput = page.getByRole("textbox", { name: "Text input" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.textArea = page.getByRole("textbox", { name: "Textarea" });
    this.disabledInput = page.getByPlaceholder("Disabled input");
    this.readonlyInput = page.getByPlaceholder("Readonly input");
    this.dropdownSelect = page.getByLabel("Dropdown (select) Open this");
    this.dropdownDatalist = page.getByRole("combobox", {
      name: "Dropdown (datalist)",
    });
    this.fileInput = page.getByRole("button", { name: "File input" });
    //this.fileInput = page.locator('input[type="file"]');
    this.checkedCheckbox = page.locator("#my-check-1");
    this.defaultCheckbox = page.locator("#my-check-2");
    this.checkedRadio = page.locator("#my-radio-1");
    this.defaultRadio = page.locator("#my-radio-2");
    this.colorPicker = page.getByRole("textbox", { name: "Color picker" });
    this.datePicker = page.getByRole("textbox", { name: "Date picker" });
    this.rangePicker = page.getByRole("slider", { name: "Example range" });
    this.submitBtn = page.getByRole("button", { name: "Submit" });
    this.submitedMsg = page.getByRole("heading", { name: "Form submitted" });
  }

  async fillTextInput(input: string) {
    await Logger.logStep("Fill text input", async () => {
      await this.actions.typeText(this.textInput, input);
    });
  }

  async fillPassword(input: string) {
    await Logger.logStep("Fill password", async () => {
      await this.actions.typeText(this.passwordInput, input);
    });
  }

  async fillTextArea(input: string) {
    await Logger.logStep("Fill textarea", async () => {
      await this.actions.typeText(this.textArea, input);
    });
  }

  async selectFromDropdown(input: string) {
    await Logger.logStep("Select option from dropdown", async () => {
      await this.actions.selectOption(this.dropdownSelect, input ?? "One");
    });
  }

  async selectFromDatalist(input: string) {
    await Logger.logStep("Select value from datalist", async () => {
      await this.actions.typeText(this.dropdownDatalist, input);
    });
  }

  async uploadFile(filePath?: string) {
    await Logger.logStep("Upload file", async () => {
      await this.actions.sendFile(
        this.fileInput,
        filePath ?? path.join("/resources/f-vat_2011.pdf"),
      );
    });
  }

  async pickCheckbox(checkbox: number, check: boolean) {
    await Logger.logStep(`Pick checkbox #${checkbox} -> ${check}`, async () => {
      if (checkbox == 1) {
        await this.actions.checkUncheck(this.checkedCheckbox, check);
      } else {
        await this.actions.checkUncheck(this.defaultCheckbox, check);
      }
    });
  }

  async pickRadio(radio: number) {
    await Logger.logStep(`Pick radio #${radio}`, async () => {
      if (radio == 1) {
        await this.actions.checkUncheckRadio(this.checkedRadio);
      } else {
        await this.actions.checkUncheckRadio(this.defaultRadio);
      }
    });
  }

  async pickColor(color: string) {
    await Logger.logStep("Pick color", async () => {
      await this.actions.insertText(this.colorPicker, color);
    });
  }

  async pickDate(date: string) {
    await Logger.logStep("Pick date", async () => {
      await this.actions.typeText(this.datePicker, date);
    });
  }

  async pickRange(range: number) {
    await Logger.logStep("Pick range", async () => {
      await this.actions.rangeManipulator(this.rangePicker, range);
    });
  }

  async sendForm() {
    await Logger.logStep("Submit web form", async () => {
      await this.submitBtn.click();
      await expect(this.page.getByText("Form submitted")).toBeVisible();
    });
  }
  // -------------- Asertions ----------

  async verifyTextInput(input: string) {
    await Logger.logStep("Veryfying text input", async () => {
      await this.actions.verifyInput(this.textInput, input);
    });
  }
  async verifyPasswordInput(input: string) {
    await Logger.logStep("Veryfying password input value", async () => {
      await this.actions.verifyInput(this.passwordInput, input);
    });
  }
  async verifyTextAreaInput(input: string) {
    await Logger.logStep("Veryfying text area input", async () => {
      await this.actions.verifyInput(this.textArea, input);
    });
  }
  async verifyDropdownOption(input: string) {
    await Logger.logStep("Veryfying dropdown picked value", async () => {
      await expect(this.dropdownSelect).toHaveValue(input);
    });
  }
  async verifyDataListOption(input: string) {
    await Logger.logStep("Veryfying data list option", async () => {
      await this.actions.verifyInput(this.dropdownDatalist, input);
    });
  }
  async verifyFileIsUploaded(file?: string) {
    await Logger.logStep("Veryfying file upload input", async () => {
      if (file) {
        await expect(this.fileInput).toHaveValue(file);
      } else {
        await expect(this.fileInput).toHaveValue(/f-vat_2011\.pdf$/);
      }
    });
  }

  async verifyCheckboxChecked(checkbox: number) {
    await Logger.logStep("Veryfying slider value", async () => {
      if (checkbox == 1) {
        await this.actions.verifyCheckbox(this.checkedCheckbox, true);
        await this.actions.verifyCheckbox(this.defaultCheckbox, false);
      } else {
        await this.actions.verifyCheckbox(this.checkedCheckbox, false);
        await this.actions.verifyCheckbox(this.defaultCheckbox, true);
      }
    });
  }

  async verifyRadioChecked(checkbox: number) {
    await Logger.logStep("Veryfying radio buttons checked", async () => {
      if (checkbox == 1) {
        await this.actions.verifyCheckbox(this.checkedRadio, true);
        await this.actions.verifyCheckbox(this.defaultRadio, false);
      } else {
        await this.actions.verifyCheckbox(this.checkedRadio, false);
        await this.actions.verifyCheckbox(this.defaultRadio, true);
      }
    });
  }
  async verifyColor(color: string) {
    await Logger.logStep("Veryfying color input", async () => {
      await expect(this.colorPicker).toHaveValue(color);
    });
  }

  async verifyDate(date: string) {
    await Logger.logStep("Veryfying date input", async () => {
      await expect(this.datePicker).toHaveValue(date);
    });
  }
  async verifySliderValue(num: number) {
    await Logger.logStep("Veryfying slider value", async () => {
      await expect(this.rangePicker).toHaveValue(num.toString());
    });
  }
  async verifySucessOfSubmitForm() {
    await Logger.logStep("Veryfying form is submited sucessfully", async () => {
      await expect(this.submitedMsg).toBeVisible();
    });
  }
}
