import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../const/const";

enum CategoriesOptions {
  HandTools = "Hand Tools",
  PowerTools = "Power Tools",
  Other = "Other",
  SpecialTools = "Special Tools",
  Rentals = "Rentals",
}

enum Languages {
  DE = 'DE',
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  NL = 'NL',
  TR = 'TR',
}


export class NavBarComponent {
  readonly page: Page;
  readonly homeBtn: Locator;
  readonly categoriesBtn: Locator;
  readonly contacBtn: Locator;
  readonly signInBtn: Locator;
  readonly localeBtn: Locator;
  readonly logoImg: Locator;
  readonly bannerImg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeBtn = page.getByRole("menuitem", { name: "Home" });
    this.categoriesBtn = page.getByRole("menuitem", { name: "Categories" });
    this.contacBtn = page.getByRole("menuitem", { name: "Contact" });
    this.signInBtn = page.getByRole("menuitem", { name: "Sign in" });
    this.localeBtn = page.locator("#language");
    this.logoImg = page.getByRole("img", { name: "Practice Software Testing" });
    this.bannerImg = page.getByRole("img", { name: "Banner" });
  }

  public async home(): Promise<void> {
    await this.homeBtn.click();
    await expect(this.page).toHaveURL(constants.url);
  }

  public async conatct(): Promise<void> {
    await this.contacBtn.click();
    await expect(this.page).toHaveURL((constants.url).concat("contact"));
  }


  public async singIn(): Promise<void> {
    await this.signInBtn.click();
    await expect(this.page).toHaveURL((constants.url).concat("auth/login"));
  }

  public async changeLanguage(language: Languages) {
    await this.localeBtn.selectOption(language);
  }


  public async pickCategory(option: CategoriesOptions): Promise<void> {
    await expect(this.categoriesBtn).toBeVisible();
    await this.categoriesBtn.selectOption(option);
    await this.page.waitForURL(`**/${option}`);
  }


  
}
