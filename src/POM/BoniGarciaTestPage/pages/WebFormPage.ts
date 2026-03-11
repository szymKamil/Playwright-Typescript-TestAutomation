import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import path from "path";
import { Actions } from "./Actions/Actions";

export default class WebForm {
  readonly actions: Actions;
  readonly page: Page;
  readonly mainHeader: Locator;
  readonly logoImg: Locator;
  readonly pageTitle: Locator;
  readonly container1: Locator;
  readonly container2: Locator;
  readonly container3: Locator;
  readonly textInput: Locator;
  readonly passwordInput: Locator;
  readonly textArea: Locator;
  readonly disabledInput: Locator;
  readonly readonlyInput: Locator;
  readonly dropdownSelect: Locator;
  readonly dropdownDatalist: Locator;
  readonly fileInput: Locator;
  readonly checkedCheckbox: Locator;
  readonly defaultCheckbox: Locator;
  readonly checkedRadio: Locator;
  readonly defaultRadio: Locator;
  readonly colorPicker: Locator;
  readonly datePicker: Locator;
  readonly rangePicker: Locator;
  readonly submitBtn: Locator;

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
    this.passwordInput = page.getByRole("textbox", { name: /password/i });
    this.textArea = page.locator('[name="my-textarea"]');
    this.disabledInput = page.getByPlaceholder("Disabled input");
    this.readonlyInput = page.getByPlaceholder("Readonly input");
    this.dropdownSelect = page.getByLabel("Dropdown (select) Open this");
    this.dropdownDatalist = page.getByRole("combobox", {
      name: "Dropdown (datalist)",
    });
    this.fileInput = page.getByRole("button", { name: "File input" });
    this.checkedCheckbox = page.locator("#my-check-1");
    this.defaultCheckbox = page.locator("#my-check-2");
    this.checkedRadio = page.locator("#my-radio-1");
    this.defaultRadio = page.locator("#my-radio-2");
    this.colorPicker = page.getByRole("textbox", { name: "Color picker" });
    this.datePicker = page.getByRole("textbox", { name: "Date picker" });
    this.rangePicker = page.getByRole("slider", { name: "Example range" });
    this.submitBtn = page.getByRole("button", { name: "Submit" });
  }

  async verifyWebFormPageElements(): Promise<void> {
    await expect(this.mainHeader).toBeVisible();
    await expect(this.logoImg).toBeVisible();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.container1).toMatchAriaSnapshot(
      `- text: Text input
- textbox 'Text input'
- text: Password
- textbox 'Password'
- text: Textarea
- textbox 'Textarea'
- text: Disabled input
- textbox 'Disabled input' [disabled]
- text: Readonly input
- textbox 'Readonly input'
- link 'Return to index':
  - /url: ./index.html`,
    );
    await expect(this.container2).toMatchAriaSnapshot(`
- text: Dropdown (select)
- combobox 'Dropdown (select)':
  - option 'Open this select menu' [selected]
  - option 'One'
  - option 'Two'
  - option 'Three'
- text: Dropdown (datalist)
- combobox 'Dropdown (datalist)'
- text: File input
- button 'File input'
- checkbox 'Checked checkbox' [checked]
- text: Checked checkbox
- checkbox 'Default checkbox'
- text: Default checkbox
- radio 'Checked radio' [checked]
- text: Checked radio
- radio 'Default radio'
- text: Default radio
- button 'Submit'
        `);
    await expect(this.container3).toMatchAriaSnapshot(`
- text: Color picker
- textbox 'Color picker': '#563d7c'
- text: Date picker
- textbox 'Date picker'
- text: Example range
- slider 'Example range': '5'
        `);
  }

  async fillTextInput(input?: string) {
    await this.actions.sendTextToInput(
      this.textInput,
      input ?? faker.string.sample({ min: 4, max: 10 }),
    );
  }

  async fillPassword(input?: string) {
    await this.actions.sendTextToInput(
      this.passwordInput,
      input ?? faker.string.sample({ min: 4, max: 10 }),
    );
  }

  async fillTextArea(input?: string) {
    await this.actions.sendTextToInput(
      this.textArea,
      input ?? faker.string.sample({ min: 15, max: 25 }),
    );
  }

  async selectFromDropdown(input?: string) {
    await this.actions.sendTextToInput(this.dropdownSelect, input ?? "One");
  }

  async selectFromDatalist(input?: string) {
    await this.actions.sendTextToInput(
      this.dropdownDatalist,
      input ?? "New York",
    );
  }


  public async fillWebForm(options: {
    dropdownData?: string;
    filePath?: string;
    cbToCheck?: number;
    color?: string;
    date?: string;
    range?: number;
  }): Promise<void> {
    const { dropdownData, filePath, cbToCheck, color, date, range } = options;

    const dropdownDataValue: string = dropdownData ?? "New York";
    await this.fillInput(this.dropdownDatalist, dropdownDataValue);

    const checkbox: number = cbToCheck ?? 1;
    if (checkbox == 1) {
      await this.checkUncheck(this.checkedCheckbox);
    } else {
      await this.checkUncheck(this.defaultCheckbox);
    }

    this.checkUncheckRadio(this.checkedRadio, this.defaultRadio);

    const filePathInput: string =
      filePath ?? path.join(process.cwd(), "/resources/f-vat_2011.pdf");
    await this.fileInput.setInputFiles(path.join(filePathInput));

    const rangeInput: number = range ?? 1;
    await this.rangeManipulator(rangeInput);

    const colorInput: string = color ?? "#0aca0a";
    await this.fillInput(this.colorPicker, colorInput);

    const dateInput: string = date ?? "12/25/2026";
    await this.fillInput(this.datePicker, dateInput);
  }

  private async fillInput(
    element: Locator,
    fill: string,
    key?: boolean,
  ): Promise<void> {
    await expect(element).toBeVisible();
    await element.pressSequentially(fill);
    if (key) {
      await element.press("Enter");
    }
  }

  private async checkUncheck(element: Locator): Promise<void> {
    if (await element.isChecked()) {
      await element.uncheck();
    } else {
      await element.check();
      await element.isChecked();
    }
  }

  private async checkUncheckRadio(
    element: Locator,
    element2: Locator,
  ): Promise<void> {
    const radioRole = await element.getAttribute("role");
    const isRadio = radioRole == "radio";
    if (isRadio) {
      if (await element.isChecked()) {
        await this.checkUncheck(element2);
      } else {
        await this.checkUncheck(element);
      }
    }
  }
  private async rangeManipulator(target: number): Promise<void> {
    let current = Number(await this.rangePicker.inputValue());
    while (current !== target) {
      if (current < target) {
        await this.rangePicker.press("ArrowRight");
      } else {
        await this.rangePicker.press("ArrowLeft");
      }
      current = Number(await this.rangePicker.inputValue());
    }
  }

  async sendForm() {
    await this.submitBtn.click();
    await expect(this.page.getByText("Form submitted")).toBeVisible();
  }
}
