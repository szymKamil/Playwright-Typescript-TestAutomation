import { th } from "@faker-js/faker/.";
import { Locator, Page } from "@playwright/test";
import { Actions } from "src/_Tools/Actions";


export interface RegistrationForm {
    firstName: string;
    lastName: string;
    birthDate: string;
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
  }

export class Registartion {
  readonly actions: Actions;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly streetInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly phoneInput: Locator;
  readonly emailAdressInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordToggleVisibilityBtn: Locator;
  readonly passwordHint: Locator;
  readonly passwordStrengthMeter: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    this.actions = new Actions(page);
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.dateOfBirthInput = page.getByRole("textbox", {
      name: "Date of birth",
    });
    this.streetInput = page.getByRole("textbox", { name: "Street" });
    this.postalCodeInput = page.getByRole("textbox", { name: "Postal code" });
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.stateInput = page.getByRole("textbox", { name: "State" });
    this.countryInput = page.getByRole("combobox", { name: "Country" });
    this.phoneInput = page.getByRole("textbox", { name: "Phone" });
    this.emailAdressInput = page.getByRole("textbox", {
      name: "Email address",
    });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.passwordToggleVisibilityBtn = page.getByRole("button");
    this.passwordHint = page.locator("#passwordHelp");
    this.passwordStrengthMeter = page.locator("div.password-strength.mt-2");
    this.registerBtn = page.getByRole("button", { name: "Register" });
  }


  

  public async fillRegistrationForm(data: RegistrationForm) {
      await this.actions.insertText(this.firstNameInput, data.firstName);
      await this.actions.insertText(this.lastNameInput, data.lastName);
      await this.actions.insertText(this.dateOfBirthInput, data.birthDate);
      await this.actions.insertText(this.streetInput, data.street);
      await this.actions.insertText(this.postalCodeInput, data.postalCode);
      await this.actions.insertText(this.cityInput, data.city);
      await this.actions.insertText(this.stateInput, data.state);
      await this.actions.selectOption(this.countryInput, data.country);
      await this.countryInput.click();
      await this.countryInput.click();
      await this.actions.insertText(this.phoneInput, data.phone);
      await this.actions.insertText(this.emailAdressInput, data.email);
      await this.actions.insertText(this.passwordInput, data.password);
      await this.registerBtn.click();
  }

};