import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Actions } from "../../../_Tools/Actions";

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
  private readonly screen: Locator;
  readonly actions: Actions;

  constructor(page: Page) {
    super(page);
    this.actions = new Actions(page);
    this.correctResultConfig = page.locator("#percent");
    this.numOfRetries = page.locator("#correct");
    this.calcBtn = page.locator("span.btn");
    this.screen = page.locator("div.screen");
  }

  async goto(){
    await this.page.goto('random-calculator.html')
  }

  async setCorrectResultPercentage(input: number | string) {
    await this.actions.insertText(this.correctResultConfig, input);
  }

  async verifyCorrectResultPrecentageInput(input: number | string){
    await this.actions.verifyInput(this.correctResultConfig, input);
  }

  async setRetries(input: number | string) {
    await this.actions.insertText(this.numOfRetries, input);
  }

  async verifyCInsertedNumOfRetries(input: number | string){
    await this.actions.verifyInput(this.numOfRetries, input);
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
