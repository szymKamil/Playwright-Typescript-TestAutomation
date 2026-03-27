import { fixture as test } from "./Fixture/boniGarciaFixture";
import {
  DropdownMenuPage,
  DropdownType,
} from "../../src/POM/BoniGarciaTestPage/pages/DropdownMenuPage";

test.beforeEach(async ({ mainPage }) => {
  await mainPage.openMainPage();
});

test("Drodpown page test", async ({ mainPage, page }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Dropdown menu");
  const dropdownPage = new DropdownMenuPage(page);
  await dropdownPage.openDropdownMenuPage(DropdownType.left, "left");
  await dropdownPage.openDropdownMenuPage(DropdownType.right, "right");
  await dropdownPage.openDropdownMenuPage(DropdownType.doubleClick, "double");
});
