import { LoginFormPage } from "../../src/POM/BoniGarciaTestPage/pages/LoginFormPage";
import { fixture as test } from "./Fixture/boniGarciaFixture";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test.describe("Test is validating sucess and failed login in to page", () => {
  test("Failed login first", async ({ mainPage, page }) => {
    await mainPage.openPage("Login form");
    const loginPage = new LoginFormPage(page);
    await loginPage.loginWithCred("test1", "test2");
    await loginPage.sendForm();
    await loginPage.assertErroRLogin();
  });

  test("Sucess login", async ({ mainPage, page }) => {
    await mainPage.openPage("Login form");
    const loginPage = new LoginFormPage(page);
    await loginPage.loginWithCred("user", "user");
    await loginPage.sendForm();
    await loginPage.assertSucessLogin();
  });

  test("Failed slow login test", async ({ mainPage, page }) => {
    await mainPage.openPage("Slow login");
    const loginPage = new LoginFormPage(page);
    await loginPage.loginWithCred("test1", "test2");
    await loginPage.sendForm();
    await loginPage.assertErroRLogin();
  });

  test("Sucess slow login test", async ({ mainPage, page }) => {
    await mainPage.openPage("Slow login");
    const loginPage = new LoginFormPage(page);
    await loginPage.loginWithCred("user", "user");
    await loginPage.sendForm();
    await loginPage.assertSucessLogin();
  });
});
