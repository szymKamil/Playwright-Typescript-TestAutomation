import { fixture as test } from "./boniGarciaFixture.ts";
import { DropdownMenuPage } from "../../src/POM/BoniGarciaTestPage/pages/DropdownMenuPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Drodpown page test", async ({ mainPage, page }) => {
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
