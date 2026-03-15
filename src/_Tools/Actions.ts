import { expect, Locator, Page } from "@playwright/test";

export class Actions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sendTextToInput(
    locator: Locator,
    input: string | number,
    enter?: boolean,
  ) {
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

  async selectOption(locator: Locator, text: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.selectOption(text);
    await expect(locator).toHaveValue(await locator.inputValue());
  }

  async sendFile(locator: Locator, file: string) {
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
