import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Actions } from "../../../_Tools/Actions.ts";

enum CalcBtns {
  "+" = "+",
  "-" = "-",
  "/" = "÷",
  "*" = "x",
  "=" = "=",
}

export class RandomCalculatorPage extends MainPage {
  private readonly correctResultConfig: Locator;
  private readonly numOfRetries: Locator;
  private readonly calcBtn: Locator;
  private readonly actions: Actions;
  private readonly screen: Locator;

  constructor(page: Page) {
    super(page);
    this.actions = new Actions(page);
    this.correctResultConfig = page.locator("#percent");
    this.numOfRetries = page.locator("#correct");
    this.calcBtn = page.locator("span.btn");
    this.screen = page.locator("div.screen");
  }

  async setCorrectResultPercentage(input: number | string) {
    await this.actions.sendTextToInput(this.correctResultConfig, input);
  }

  async setRetries(input: number | string) {
    await this.actions.sendTextToInput(this.numOfRetries, input);
  }

  async sendMathOperation(calculation: string) {
    const arrayOfCalc: string[] = calculation.split("");
    for (const x of arrayOfCalc) {
      const btnName = CalcBtns[x as keyof typeof CalcBtns] ?? x;
      await this.calcBtn.filter({ hasText: btnName }).click();
    }
    const result = await this.screen.textContent();
    console.log(`Result of math operation ${calculation} is ${result}`);
    await this.calcBtn.filter({ hasText: "C" }).click();
  }
}
