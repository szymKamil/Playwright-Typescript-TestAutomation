import { test } from "tests/ToolShopTests/Fixture/ui.fixture";
import * as constants from "../../src/POM/ToolShop/utils/constans";
import { RegistrationForm } from "src/POM/ToolShop/pages/registration-page";
import { faker } from "@faker-js/faker/locale/en";
import { expect } from "@playwright/test";

//test.use({ launchOptions: {slowMo: 500}});


test("Verify login form elements", async ({ main, login: signIn }) => {
  await main.navBar.singIn();
  await signIn.verifyLoginFormElements();
});

test.describe("UI test with user", () => {
  test.use({ userType: "admin" });
  test("Log in as admin in UI", async ({ main, login: signIn, dashboard }) => {
    await main.goto();
    await main.navBar.singIn();
    await signIn.logIn(
      constants.users.admin.email!,
      constants.users.admin.password!,
    );
    await dashboard.verifyDashboardPageVisible();
  });
});

test.describe("UI test with user", () => {
  test.use({ userType: "user1" });
  test("Log in as user in UI", async ({ myAccount, navBar }) => {
    await navBar.verifyUserLogged("Jane Doe");
    await myAccount.verifyMyAccountPageVisible();
  });
});

test.describe("Log in  as admin using API", () => {
  test.use({ userType: "admin" });
  test("Log in  as admin using API", async ({ main, navBar, loggUserAPI }) => {
    await main.goto();
    await navBar.verifyUserLogged("John Doe");
  });
});

const user: RegistrationForm = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  birthDate: "1950-12-01",
  street: faker.location.street(),
  postalCode: faker.location.zipCode(),
  city: faker.location.city(),
  state: faker.location.state(),
  country: "Poland",
  phone: "563563256",
  email: faker.internet.email(),
  password: faker.internet.password() + "@#$",
};

test.describe("Registration test with slowed input", () => {
  test("Registration test", async ({
    login,
    registration,
    request,
    myAccount,
  }) => {
    await login.goto();
    await login.goToRegistration();
    console.log(user.email, user.password);
    await registration.fillRegistrationForm(user);
    await expect(async () => {
      const response = await request.post("/users/login", {
        data: {
          email: user.email,
          password: user.password,
        },
      });
      expect(response.status()).toBe(200);
    }).toPass({ timeout: 20000, intervals: [1000] });
    await login.verifyLoginFormElements();
    await login.logIn(user.email, user.password);
  });
});
