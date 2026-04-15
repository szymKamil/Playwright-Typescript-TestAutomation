import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constans";
import { SignIn } from "../pages/SignIn";
import { Contact } from "../pages/Contact";

export enum CategoriesOptions {
  HandTools = "Hand Tools",
  PowerTools = "Power Tools",
  Other = "Other",
  SpecialTools = "Special Tools",
  Rentals = "Rentals",
}

enum Languages {
  DE = "DE",
  EN = "EN",
  ES = "ES",
  FR = "FR",
  NL = "NL",
  TR = "TR",
}

export class NavBarComponent {
  readonly page: Page;
  readonly homeBtn: Locator;
  readonly categoriesBtn: Locator;
  readonly categoriesContainer: Locator;
  readonly contacBtn: Locator;
  readonly signInBtn: Locator;
  readonly localeBtn: Locator;
  readonly logoImg: Locator;
  readonly bannerImg: Locator;
  readonly loggedUserMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeBtn = page.getByRole("menuitem", { name: "Home" });
    this.categoriesBtn = page.getByRole("menuitem", { name: "Categories" });
    this.categoriesContainer = page.getByRole("list", {
      name: "nav-categories",
    });
    this.contacBtn = page.getByRole("menuitem", { name: "Contact" });
    this.signInBtn = page.getByRole("menuitem", { name: "Sign in" });
    this.localeBtn = page.locator("#language");
    this.logoImg = page.getByRole("link", {
      name: "Practice Software Testing -",
    });
    this.bannerImg = page.getByRole("img", { name: "Banner" });
    this.loggedUserMenu = page.locator("#menu");
  }

  public async home(): Promise<void> {
    await this.homeBtn.click();
    await expect(this.page).toHaveURL(constants.TOOLSHOP_URL);
  }

  public async contact(): Promise<Contact> {
    await this.contacBtn.click();
    await expect(this.page).toHaveURL("/contact");
    return new Contact(this.page);
  }

  public async singIn(): Promise<SignIn> {
    await this.signInBtn.click();
    await expect(this.page).toHaveURL("/auth/login");
    return new SignIn(this.page);
  }

  public async changeLanguage(language: Languages) {
    await this.localeBtn.selectOption(language);
  }

  public async pickCategory(option: CategoriesOptions): Promise<void> {
    await expect(this.categoriesBtn).toBeVisible();
    await this.categoriesBtn.click();
    await expect(this.categoriesContainer).toBeVisible();
    const urlSlug = option.toLowerCase().replace(/\s+/g, "-");
    await Promise.all([
      this.page.waitForURL(`**/${urlSlug}`),
      this.categoriesContainer.getByText(option).click(),
    ]);
  }

  /**
   * Interface test
   */
  public async verifyElementsPage(element: Locator) {
    await expect(element).toBeVisible();
  }

  public async verifyUserLogged(name: string): Promise<void> {
      await expect(this.loggedUserMenu).toHaveText(name);
  }
}
