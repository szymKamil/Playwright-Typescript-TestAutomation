import { test as base } from "@playwright/test";
import { NavBarComponent } from "src/POM/ToolShop/components/NavBar";
import { Contact } from "src/POM/ToolShop/pages/Contact";
import { DashboardPage } from "src/POM/ToolShop/pages/DashBoardPage";
import { Main } from "src/POM/ToolShop/pages/page";
import { MyAccountPage } from "src/POM/ToolShop/pages/MyAccountPage";
import { SignIn } from "src/POM/ToolShop/pages/SignIn";
import { ProductCard } from "src/POM/ToolShop/components/ProductCard";

type BaseFixtures = {
  main: Main;
  login: SignIn;
  contact: Contact;
  navBar: NavBarComponent;
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

  navBar: async ({ page }, use) => {
    await use(new NavBarComponent(page));
  },

  dashboard: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  myAccount: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },

  productCard: async({ page }, use) => {
    await use(new ProductCard(page));
  }
});
