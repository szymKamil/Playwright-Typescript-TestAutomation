import { test as base } from "@playwright/test";
import { NavBarComponent } from "src/POM/ToolShop/components/navbar";
import { Contact } from "src/POM/ToolShop/pages/contact-page";
import { DashboardPage } from "src/POM/ToolShop/pages/dashboard-page";
import { Main } from "src/POM/ToolShop/pages/_base-page";
import { MyAccountPage } from "src/POM/ToolShop/pages/my-account-page";
import { SignIn } from "src/POM/ToolShop/pages/login-page";
import { ProductCard } from "src/POM/ToolShop/components/product-card";
import { RentalPage } from "src/POM/ToolShop/pages/rentals-page";

type BaseFixtures = {
  main: Main;
  login: SignIn;
  contact: Contact;
  navBar: NavBarComponent;
  rental: RentalPage;
  dashboard: DashboardPage;
  myAccount: MyAccountPage;
  productCard: ProductCard;
};

export const test = base.extend<BaseFixtures>({
  main: async ({ page }, use) => {
    await use(new Main(page));
  },

  login: async ({ page }, use) => {
    await use(new SignIn(page));
  },

  contact: async ({ page }, use) => {
    await use(new Contact(page));
  },
  rental: async ({ page }, use) => {
    await use(new RentalPage(page));
  },

  navBar: async ({ page }, use) => {
    await use(new NavBarComponent(page));
  },

  dashboard: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  myAccount: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },

  productCard: async ({ page }, use) => {
    await use(new ProductCard(page));
  },
});
