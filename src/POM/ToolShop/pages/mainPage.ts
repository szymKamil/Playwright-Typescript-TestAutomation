import { expect, Locator, Page } from "@playwright/test";
import { NavBarComponent } from "../components/NavBar";
import { Logger } from "../../../_Tools/Logger";
import { Actions } from "../../../_Tools/Actions";
import { SearchFunctions } from "../components/SearchFilter";
import { ProductList } from "../components/ProductList";
import { CategoryTreeFilter } from '../components/CategoryTreeFilter'

export class MainPage {
  readonly navBar: NavBarComponent;
  readonly logger: Logger;
  readonly actions: Actions;
  readonly search: SearchFunctions;
  readonly productList: ProductList;
  readonly categoryTree: CategoryTreeFilter;

  constructor(page: Page) {
    this.navBar = new NavBarComponent(page);
    this.logger = new Logger();
    this.actions = new Actions(page);
    this.search = new SearchFunctions(page);
    this.productList = new ProductList(page);
    this.categoryTree = new CategoryTreeFilter(page);
  }

  async verifyMainPage() {
    await Logger.logStep("Veryfing main page elements", async () => {
      await this.navBar.verifyElementsPage();
      console.log(
        Logger.getTimestamp(),
        "All of the elements in Home page are visible",
      );
    });
    await Logger.logStep(
      "Veryfing main page elements by screenshot",
      async () => {
        await this.actions.pageVisualTest("toolShopMainPage");
      },
    );
  }

    





}

