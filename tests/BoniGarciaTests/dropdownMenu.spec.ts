import { fixture as test } from "./_fixture/boniGarciaFixture";
import { DropdownType } from "../../src/POM/BoniGarciaTestPage/pages/DropdownMenuPage";

test("Drodpown page test", async ({ mainPage, dropdownPage }) => {
  await mainPage.openMainPage();
  await mainPage.openPage("Dropdown menu");
  await dropdownPage.openDropdownMenuPage(DropdownType.left, "left");
  await dropdownPage.verifyDropdownPresent("left");
  await dropdownPage.openDropdownMenuPage(DropdownType.right, "right");
  await dropdownPage.verifyDropdownPresent("right");
  await dropdownPage.openDropdownMenuPage(DropdownType.doubleClick, "double");
  await dropdownPage.verifyDropdownPresent("double");
});
