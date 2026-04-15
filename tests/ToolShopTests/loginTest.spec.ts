import { test } from "tests/ToolShopTests/Fixture/ui.fixture";
import * as constants from "../../src/POM/ToolShop/utils/constans";

test("Verify login form elements", async ({ main, signIn }) => {
  await main.navBar.singIn();
  await signIn.verifyLoginFormElements();
});

test.describe("UI test with user", () => {
  test.use({ userType: "admin" });
  test("Log in as admin in UI", async ({ main, signIn, dashboard }) => {
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
  test("Log in as user in UI", async ({ myAccount, loggUserUI }) => {
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
