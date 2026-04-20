import { fixture as test } from "./Fixture/boniGarciaFixture";

test.describe("Test is validating sucess and failed login in to page", () => {
  test("Failed login first", async ({ mainPage, loginPage }) => {
    await mainPage.openPage("Login form");
    await loginPage.loginWithCred("test1", "test2");
    await loginPage.sendForm();
    await loginPage.assertErroRLogin();
  });

  test("Sucess login", async ({ mainPage, loginPage }) => {
    await mainPage.openPage("Login form");
    await loginPage.loginWithCred("user", "user");
    await loginPage.sendForm();
    await loginPage.assertSucessLogin();
  });

  test("Failed slow login test", async ({ mainPage, loginPage }) => {
    await mainPage.openPage("Slow login");
    await loginPage.loginWithCred("test1", "test2");
    await loginPage.sendForm();
    await loginPage.assertErroRLogin();
  });

  test("Sucess slow login test", async ({ mainPage, loginPage }) => {
    await mainPage.openPage("Slow login");
    await loginPage.loginWithCred("user", "user");
    await loginPage.sendForm();
    await loginPage.assertSucessLogin();
  });
});
