import { Locator, Page } from "@playwright/test";
import { Actions } from "src/_Tools/Actions";
import { RegistrationForm } from "./registration-page";

export class SignIn {
  private readonly page: Page;
  readonly actions: Actions;
  readonly googleBtnLogin: Locator;
  readonly emailAdressInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordBtn: Locator;
  readonly loginBtn: Locator;
  readonly registerLink: Locator;
  readonly forgotPassword: Locator;

  constructor(page: Page) {
    this.page = page;
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

  public async goto(){
    await this.page.goto('/auth/login')
  }

  async verifyLoginFormElements() {
    await this.googleBtnLogin.waitFor({ state: "visible" });
    await this.emailAdressInput.waitFor({ state: "visible" });
    await this.passwordInput.waitFor({ state: "visible" });
    await this.showPasswordBtn.waitFor({ state: "visible" });
    await this.loginBtn.waitFor({ state: "visible" });
    await this.registerLink.waitFor({ state: "visible" });
    await this.forgotPassword.waitFor({ state: "visible" });
  };

  async logIn(email: string, password: string) {
      await this.actions.typeText(this.emailAdressInput, email);
      await this.actions.typeText(this.passwordInput, password);
      await this.loginBtn.click();
  };

  async pressLoginButton(){
    await this.loginBtn.click();
  }


  async goToRegistration(){
    await this.registerLink.click();
  }

}
