import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { log } from "node:console";

export class LoginFormPage extends MainPage {
  private readonly loginInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitBtn: Locator;
  private readonly invalidAlert: Locator;
  private readonly sucessAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.loginInput = page.getByRole("textbox", { name: "Login" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.submitBtn = page.getByRole("button", { name: "Submit" });
    this.invalidAlert = page.getByText("Invalid credentials");
    this.sucessAlert = page.getByText("Login successful");
  }

  async loginWithCred(login: string, password: string) {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
  }

  async sendForm() {
    await this.submitBtn.click();
  }

  async assertErroRLogin() {
    await expect(this.invalidAlert).toBeVisible();
  }

  async assertSucessLogin() {
    await expect(this.sucessAlert).toBeVisible();
  }
}
