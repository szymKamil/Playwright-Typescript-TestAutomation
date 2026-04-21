import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { ar } from "@faker-js/faker";

export class SlowCalculator extends MainPage {
  private readonly delayInput: Locator;
  private readonly calculationResult: Locator;
  private readonly calculatorSpace: Locator;

  constructor(page: Page) {
    super(page);
    this.delayInput = page.locator("#delay");
    this.calculationResult = page.locator(".screen");
    this.calculatorSpace = page.locator("#calculator");
  }

  async setDelay(delay: number): Promise<void> {
    await this.delayInput.fill(delay.toString());
  }

  async calculate(calculation: string): Promise<void> {
    const arithmeticArray = calculation.split("");
    for (const calc in arithmeticArray) {
      switch (arithmeticArray[calc]) {
        case "*":
          arithmeticArray[calc] = "x";
          break;
        case "/":
          arithmeticArray[calc] = "÷";
          break;
        default:
          arithmeticArray[calc];
      }
      await expect(
        this.calculatorSpace.locator(
          `//span[text()="${arithmeticArray[calc]}"]`,
        ),
      ).toBeVisible();
      await this.calculatorSpace
        .locator(`//span[text()="${arithmeticArray[calc]}"]`)
        .click();
    }
    await this.calculatorSpace.locator(`//span[text()="="]`).click();
    await expect(this.calculationResult).not.toHaveText(calculation);
    await expect(this.calculationResult).toContainText(/\d+/);
    const result = await this.calculationResult.textContent();
    console.log("Wynik działania to: " + result);
  }

  async verifyResult(result: string | number) {
    await expect(this.calculationResult).toHaveText(result.toString(), {
      timeout: 20_000,
    });
  }
}
