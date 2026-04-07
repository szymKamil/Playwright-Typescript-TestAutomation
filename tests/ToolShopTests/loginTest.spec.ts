import { test, expect } from "@playwright/test";
import * as constans from "src/POM/ToolShop/utils/constans";
import { MainPage } from "src/POM/ToolShop/pages/MainPage";
import { SignIn } from "src/POM/ToolShop/pages/SignIn";
import { DashboardPage } from "src/POM/ToolShop/pages/DashBoardPage";
import * as dotenv from 'dotenv';


test("Verify login form elements", async ({ page }) => {
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.navBar.singIn();
  const signInPage = new SignIn(page);
  await signInPage.verifyLoginFormElements();
});

test("Log in to admin user", async ({ page }) => {
  dotenv.config();
  await page.goto(constans.url);
  const mainPage = new MainPage(page);
  await mainPage.navBar.singIn();
  const signInPage = new SignIn(page);
  await signInPage.logIn(
    process.env.TOOLSHOP_ADMIN_LOGIN,
    process.env.TOOLSHOP_ADMIN_PASSWORD,
  );
  const dashBoardPage = new DashboardPage(page);
  await dashBoardPage.verifyDashboardPageVisible();
});
