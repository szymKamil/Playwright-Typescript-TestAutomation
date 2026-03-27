import { Locator, Page } from "@playwright/test";

export class SignIn {
  readonly googleBtnLogin: Locator;
  readonly emailAdressInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordBtn: Locator;
  readonly loginBtn: Locator;
  readonly registerBtn: Locator;
  readonly forgotPassword: Locator;

  constructor(page: Page) {
    this.googleBtnLogin;
    this.emailAdressInput;
    this.passwordInput;
    this.showPasswordBtn;
    this.loginBtn;
    this.registerBtn;
    this.forgotPassword;
  }
}
