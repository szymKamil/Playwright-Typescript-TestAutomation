import { expect, Locator, Page } from "@playwright/test";
import path from "path";

export class Actions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sendTextToInput(locator: Locator, text: string, enter?: boolean) {
    await expect(locator).toBeVisible();
    await locator.fill(text);
    if (enter) {
      await locator.press("Enter");
    }
    expect(await locator.inputValue()).toBe(text);
  }

  async selectOption(locator: Locator, text: string) {
    await expect(locator).toBeVisible();
    await locator.selectOption(text);
    await expect(locator).toHaveValue(await locator.inputValue());
  }

  async sendFile(locator: Locator, file: string) {
    //const filePath = path.join(__dirname, file);
    await locator.setInputFiles(file);
  }

  async checkUncheck(element: Locator, check?: boolean): Promise<void> {
    if (check) {
      await element.check();
      expect(await element.isChecked()).toBe(true);
    } else {
      await element.uncheck();
      expect(await element.isChecked()).toBe(false);
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
}
