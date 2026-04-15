import { test } from "@playwright/test";
import { MainPage } from "src/POM/ToolShop/pages/MainPage";
import { SignIn } from "src/POM/ToolShop/pages/SignIn";
import { DashboardPage } from "src/POM/ToolShop/pages/DashBoardPage";
import * as dotenv from "dotenv";
import { MyAccountPage } from "src/POM/ToolShop/pages/MyAccountPage";
import { test as fixTest } from "tests/ToolShopTests/Fixture/apiFixtures";
import * as constans from "src/POM/ToolShop/utils/constans";
import { test as uiTests } from "tests/ToolShopTests/Fixture/ui.fixture";

test("Verify login form elements", async ({ page }) => {
  await page.goto(constans.TOOLSHOP_URL);
  const mainPage = new MainPage(page);
  await mainPage.navBar.singIn();
  const signInPage = new SignIn(page);
  await signInPage.verifyLoginFormElements();
});

test("Log in as admin in UI", async ({ page }) => {
  dotenv.config();
  await page.goto(constans.TOOLSHOP_URL);
  const mainPage = new MainPage(page);
  await mainPage.navBar.singIn();
  const signInPage = new SignIn(page);
  await signInPage.logIn(
    process.env.TOOLSHOP_ADMIN_LOGIN!,
    process.env.TOOLSHOP_ADMIN_PASSWORD!,
  );
  const dashBoardPage = new DashboardPage(page);
  await dashBoardPage.verifyDashboardPageVisible();
});

uiTests.describe("UI test with user", () => {
  uiTests.use({ userType: "user1" });
  uiTests(
    "Log in as user in UI",
    async ({ page, mainPage, signIn, loggUserUI }) => {
      const myAccountPage = new MyAccountPage(page);
      await myAccountPage.verifyMyAccountPageVisible();
    },
  );
});

uiTests.describe("Log in  as admin using API", () => {
  uiTests.use({ userType: "admin" });
  fixTest(
    "Log in  as admin using API",
    async ({ mainPage, navBar, loggUserAPI }) => {
      await mainPage.goto();
      await navBar.verifyUserLogged("John Doe");
    },
  );
});
