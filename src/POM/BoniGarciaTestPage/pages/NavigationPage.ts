import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export default class NavigationPage extends MainPage{
  
  readonly lead: Locator;
  readonly buttons: Locator;
  readonly previousBtn: Locator;
  readonly nextsBtn: Locator;
  readonly test1: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  readonly test2: string = `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;
  readonly test3: string = `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  constructor(page: Page) {
    super(page);
    this.lead = page.locator("p.lead");
    this.buttons = page.locator("li.page-item");
    this.previousBtn = page.getByRole('link', {name: 'Previous'});
    this.nextsBtn = page.getByRole('link', {name: 'Next'});
  }

  private async getPageByNumber(num: number | string){
    return this.page.getByRole('link', {name: num.toString()});
  }

  async getActivePage(){
    return this.page.locator("li.active > a").textContent();
  }

  public async verifyNavigationPage(): Promise<void> {
    let textArray = [this.test1, this.test2, this.test3];
    for (let i = 1; i < 5; i++) {
      let btn = await this.buttons.nth(i).getAttribute("class");
      console.log(btn);
      expect(
        this.page.getByRole("main").filter({ hasText: textArray[i--] }),
      ).toBeTruthy();
      if (i < 4) {
        await this.buttons.nth(i++).click();
      }
    }
  }
  async clickPrevious(){
    if (!this.previousBtn.isDisabled()){
      await this.previousBtn.click();
    } else {
      console.log('Previous button is disabled!');
    }
  }
  async clickNext(){
    if (!await this.nextsBtn.isDisabled()){
      await this.nextsBtn.click();
    } else {
      console.log('Next button is disabled!');
    }
  }
  async openPage(num: string | number){
    await (await this.getPageByNumber(num.toString())).click();
  }

  async verifyOpenPage(){

  }

}
