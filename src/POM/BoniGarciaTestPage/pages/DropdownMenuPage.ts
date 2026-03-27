import { Logger } from "../../../_Tools/Logger";
import MainPage from "./MainPage";
import { expect, Locator, Page } from "@playwright/test";

type ClickType = "left" | "right" | "double";

export enum DropdownType {
  left = "leftBtnDropdown",
  right = "rightBtnDropdown",
  doubleClick = "doubleClickBtnDropdown",
}

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

  getDropdown(type: DropdownType): Locator {
    return this[type];
  }

  private async clickByType(type: ClickType): Promise<void> {
    switch (type) {
      case "left":
        await this.getDropdown(DropdownType.left).click();
        break;
      case "right":
        await this.getDropdown(DropdownType.right).click({ button: "right" });
        break;
      case "double":
        await this.getDropdown(DropdownType.doubleClick).dblclick();
        break;
    }
  }

  public async openDropdownMenuPage(
    dropdown: DropdownType,
    clickType: ClickType = "left",
  ): Promise<void> {
    await Logger.logStep("Dsiplaying dropdown ${clickType} type", async () => {
      await expect(this.getDropdown(dropdown)).toBeVisible();
      await this.clickByType(clickType);

      const menuMap = {
        left: this.dropdownMenu1,
        right: this.dropdownMenu2,
        double: this.dropdownMenu3,
      };

      await expect(menuMap[clickType]).toBeVisible();
    });
  }
}
