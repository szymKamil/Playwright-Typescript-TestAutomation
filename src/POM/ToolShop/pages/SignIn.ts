import { th } from "@faker-js/faker/.";
import { Locator, Page } from "@playwright/test";
import { Actions } from "src/_Tools/Actions";

export class SignIn {
  readonly actions: Actions;
  readonly googleBtnLogin: Locator;
  readonly emailAdressInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordBtn: Locator;
  readonly loginBtn: Locator;
  readonly registerLink: Locator;
  readonly forgotPassword: Locator;

  constructor(page: Page) {
    this.actions = new Actions(page);
    this.googleBtnLogin = page.getByRole("button", {
      name: "Sign in with Google",
    });
    this.emailAdressInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.showPasswordBtn = page.locator('[data-test="login-submit"]');
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.registerLink = page.locator('[data-test="register-link"]');
    this.forgotPassword = page.locator('[data-test="forgot-password-link"]');
  }

  async verifyLoginFormElements() {
    await this.googleBtnLogin.waitFor({ state: "visible" });
    await this.emailAdressInput.waitFor({ state: "visible" });
    await this.passwordInput.waitFor({ state: "visible" });
    await this.showPasswordBtn.waitFor({ state: "visible" });
    await this.loginBtn.waitFor({ state: "visible" });
    await this.registerLink.waitFor({ state: "visible" });
    await this.forgotPassword.waitFor({ state: "visible" });
  }

  async logIn(email?: string, password?: string) {
    if (!email || !password) {
      throw new Error("Email lub hasło undefined");
    } else  if (email !== undefined && password !== undefined) {
      await this.actions.insertText(this.emailAdressInput, email);
      await this.actions.insertText(this.passwordInput, password);
      await this.loginBtn.click();
    }
  }
}
