import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constans";
import { SignIn } from "../pages/login-page";
import { Contact } from "../pages/contact-page";
import { Actions } from "src/_Tools/Actions";
import { error } from "node:console";

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
  readonly actions: Actions;
  readonly navDiv: Locator;
  readonly homeBtn: Locator;
  readonly categoriesBtn: Locator;
  readonly categoriesContainer: Locator;
  readonly contacBtn: Locator;
  readonly signInBtn: Locator;
  readonly localeBtn: Locator;
  readonly logoImg: Locator;
  readonly bannerImg: Locator;
  readonly loggedUserMenu: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.navDiv = page.locator("#navbarSupportedContent");
    this.homeBtn = page.getByRole("menuitem", { name: "Home" });
    this.categoriesBtn = page.getByRole("menuitem", { name: "Categories" });
    this.categoriesContainer = page.getByRole("list", {
      name: "nav-categories",
    });
    this.contacBtn = page.getByRole("menuitem", { name: /Contact|Kontakt/ });
    this.signInBtn = page.getByRole("menuitem", { name: "Sign in" });
    this.localeBtn = page.locator("#language");
    this.logoImg = page.getByRole("link", {
      name: "Practice Software Testing -",
    });
    this.bannerImg = page.getByRole("img", { name: "Banner" });
    this.loggedUserMenu = page.locator("#menu");
    this.cartIcon = page.getByRole("menuitem", { name: "cart" });
  }

  public async home(): Promise<void> {
    await this.homeBtn.click();
    await expect(this.page).toHaveURL(constants.TOOLSHOP_URL);
  }

  public async contact(): Promise<void> {
    await this.contacBtn.click();
    await expect(this.page).toHaveURL("/contact");
  }

  public async singIn(): Promise<void> {
    await this.signInBtn.click();
    await expect(this.page).toHaveURL("/auth/login");
  }

  public async changeLanguage(language: Languages) {
    await this.localeBtn.selectOption(language);
  }

  public async openCart() {
    try {
      await expect(this.cartIcon).toBeVisible();
      await this.cartIcon.click();
    } catch {
      throw error("Cart icon is not visible!");
    }
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

  public async verifyNavTranslation(translation: Object) {
    await this.actions.verifyTranslation(this.navDiv, translation);
  }
}
