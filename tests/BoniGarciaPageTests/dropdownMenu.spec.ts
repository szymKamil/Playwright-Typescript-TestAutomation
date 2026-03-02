import { fixture as test } from "./boniGarciaFixture.spec";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import { DropdownMenuPage } from "../../src/POM/BoniGarciaTestPage/pages/DropdownMenuPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Drodpown page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Dropdown menu");
  const dropdownPage = new DropdownMenuPage(page);
  await dropdownPage.openDropdownMenuPage(dropdownPage.leftBtnDropdown, "left");
  await dropdownPage.openDropdownMenuPage(
    dropdownPage.rightBtnDropdown,
    "right",
  );
  await dropdownPage.openDropdownMenuPage(
    dropdownPage.doubleClickBtnDropdown,
    "double",
  );
});
