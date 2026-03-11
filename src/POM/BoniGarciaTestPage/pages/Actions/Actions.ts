import { expect, Locator, Page } from "@playwright/test";
import path from "path";

export class Actions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sendTextToInput(locator: Locator, text: string) {
    await locator.fill(text);
    expect(locator.inputValue()).toBe(text);
  }

  async selectOption(locator: Locator, text: string) {
    await locator.selectOption(text);
    expect(locator.inputValue).toBe(text);
  }

  async sendFile(locator: Locator, file: string) {
    const filePath = path.join(__dirname, file);
    await locator.setInputFiles(filePath);
  }
}
