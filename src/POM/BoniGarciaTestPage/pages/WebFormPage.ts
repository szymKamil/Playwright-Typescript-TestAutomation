import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import path from "path";
import { Actions } from "./Actions/Actions";

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
    this.textArea = page.getByRole('textbox', {name: "Textarea"});
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
    await expect(this.container1).toMatchAriaSnapshot(`
    - text: Text input
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
    - /url: ./index.html`);
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
    await this.actions.selectOption(this.dropdownSelect, input ?? "One");
  }

  async selectFromDatalist(input?: string) {
    await this.actions.sendTextToInput(
      this.dropdownDatalist,
      input ?? "New York",
    );
  }

  async uploadFile(filePath?: string) {
    await this.actions.sendFile(
      this.fileInput,
      filePath ?? path.join(process.cwd(), "/resources/f-vat_2011.pdf"),
    );
  }

  async pickCheckbox(checkbox: number, check: boolean) {
    if (checkbox == 1) {
      await this.actions.checkUncheck(this.checkedCheckbox, check);
    } else {
      await this.actions.checkUncheck(this.defaultCheckbox, check);
    }
  }

  async pickRadio(radio: number) {
    if (radio == 1) {
      await this.actions.checkUncheckRadio(this.checkedRadio);
    } else {
      await this.actions.checkUncheckRadio(this.defaultRadio);
    }
  }

  async pickColor(color?: string) {
    await this.actions.sendTextToInput(this.colorPicker, color ?? "#0aca0a");
  }

  async pickDate(date?: string) {
    const dateInput: string = date ?? new Date(Date.now()).toISOString();
    await this.actions.sendTextToInput(this.datePicker, dateInput);
  }

  async pickRange(range?: number) {
    await this.actions.rangeManipulator(this.rangePicker, range ?? 1);
  }

  async sendForm() {
    await this.submitBtn.click();
    await expect(this.page.getByText("Form submitted")).toBeVisible();
  }
}
