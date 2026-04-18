import { expect, Locator, Page } from "@playwright/test";
import path from "path";
import fs from "fs";

export class Actions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async insertText(locator: Locator, input: string | number, enter?: boolean) {
    await expect(locator).toBeVisible();
    if (typeof input === "string") {
      await locator.fill(input);
    } else if (typeof input === "number") {
      await locator.fill(input.toString());
    }
    if (enter) {
      await locator.press("Enter");
    }
    expect(await locator.inputValue()).toBe(input.toString());
  }

  async typeText(locator: Locator, input: string | number, enter?: boolean) {
    await expect(locator).toBeVisible();
    if (typeof input === "string") {
      await locator.pressSequentially(input);
    } else if (typeof input === "number") {
      await locator.pressSequentially(input.toString());
    }
    if (enter) {
      await locator.press("Enter");
    }
    expect(await locator.inputValue()).toBe(input.toString());
  }

  async selectOption(locator: Locator, text: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.selectOption(text);
    await expect(locator).toHaveValue(await locator.inputValue());
  }

  // async selectOptionInCombobox(locator: Locator, text: string): Promise<void> {
  //   ///TODO:
  //   await expect(locator).toBeVisible();
  //   await locator.click();
  //   await expect(locator).toHaveValue(await locator.inputValue());
  // }

  async sendFile(locator: Locator, file: string) {
    await locator.setInputFiles(path.join(process.cwd(), file));
  }

  async checkUncheck(element: Locator, uncheck?: boolean): Promise<void> {
    if (uncheck) {
      await element.uncheck();
      expect(await element.isChecked()).toBe(false);
    } else {
      await element.check();
      expect(await element.isChecked()).toBe(true);
    }
  }

  async checkUncheckRadio(element: Locator): Promise<void> {
    const radioRole = await element.getAttribute("type");
    const isRadio = radioRole == "radio";
    if (isRadio) {
      await element.check();
      expect(element.isChecked());
    } else {
      throw new Error("Element is not a radio");
    }
  }

  async rangeManipulator(locator: Locator, target: number): Promise<void> {
    let current = Number(await locator.inputValue());
    while (current !== target) {
      if (current < target) {
        await locator.press("ArrowRight");
      } else {
        await locator.press("ArrowLeft");
      }
      current = Number(await locator.inputValue());
    }
  }

  async pageVisualTest(pageName: string) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.page.screenshot()).toMatchSnapshot(`${pageName}.png`, {
      maxDiffPixelRatio: 0.1,
    });
  }

  async goBack() {
    await this.page.goBack();
  }

  async createTestFile(fileName: string, content?: string): Promise<string> {
    const relativePath = `${fileName}`;
    fs.writeFileSync(relativePath, content || "");
    return relativePath;
  }

  async deleteTestFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  async verifyTranslation(locator: Locator, translation: Object){
    for (const value of Object.values(translation)) {
    if (Array.isArray(value)) {
      for (const text of value) {
        await expect(locator).toContainText(text);
      }
    } else {
      await expect(locator).toContainText(value);
    }
  }
  }
}
