import { Logger } from "../../../_Tools/Logger";
import MainPage from "./MainPage";
import { expect, Locator, Page } from "@playwright/test";

type ClickType = "left" | "right" | "double";

export class DropdownMenuPage extends MainPage {
  private readonly leftBtnDropdown: Locator;
  private readonly rightBtnDropdown: Locator;
  private readonly doubleClickBtnDropdown: Locator;
  private readonly dropdownMenu1: Locator;
  private readonly dropdownMenu2: Locator;
  private readonly dropdownMenu3: Locator;
  //   private readonly menuMap: Record<ClickType, Locator>;

  constructor(page: Page) {
    super(page);
    this.leftBtnDropdown = page.locator("#my-dropdown-1");
    this.rightBtnDropdown = page.locator("#my-dropdown-2");
    this.doubleClickBtnDropdown = page.locator("#my-dropdown-3");

    this.dropdownMenu1 = page.locator("ul.dropdown-menu.show");
    this.dropdownMenu2 = page.locator("#context-menu-2");
    this.dropdownMenu3 = page.locator("#context-menu-3");
  }

  private async clickByType(dropdown: Locator, type: ClickType): Promise<void> {
    switch (type) {
      case "left":
        await dropdown.click();
        break;
      case "right":
        await dropdown.click({ button: "right" });
        break;
      case "double":
        await dropdown.dblclick();
        break;
    }
  }

  public async openDropdownMenuPage(
    dropdown: Locator,
    clickType: ClickType = "left",
  ): Promise<void> {
    await Logger.logStep("Dsiplaying dropdown ${clickType} type", async () => {
      await expect(dropdown).toBeVisible();
      await this.clickByType(dropdown, clickType);

      const menuMap = {
        left: this.dropdownMenu1,
        right: this.dropdownMenu2,
        double: this.dropdownMenu3,
      };

      await expect(menuMap[clickType]).toBeVisible();
    });
  }
}
