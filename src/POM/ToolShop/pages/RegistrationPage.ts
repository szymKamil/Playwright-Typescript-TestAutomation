import { Locator, Page } from "@playwright/test";

export class Registartion {
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
}
