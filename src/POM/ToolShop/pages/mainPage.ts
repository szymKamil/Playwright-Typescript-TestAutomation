import { expect, Locator, Page } from "@playwright/test";
import { NavBarComponent } from "../components/NavBar";
import { Logger } from "../../../_Tools/Logger";
import { Actions } from "../../../_Tools/Actions";
import { SearchFunctions } from "../components/SearchFilter";
import { ProductList } from "../components/ProductList";
import { CategoryTreeFilter } from "../components/CategoryTreeFilter";

export class Main {
  readonly page: Page;
  readonly navBar: NavBarComponent;
  readonly logger: Logger;
  readonly actions: Actions;
  readonly search: SearchFunctions;
  readonly productList: ProductList;
  readonly categoryTree: CategoryTreeFilter;

  constructor(page: Page) {
    this.page = page;
    this.navBar = new NavBarComponent(page);
    this.logger = new Logger();
    this.actions = new Actions(page);
    this.search = new SearchFunctions(page);
    this.productList = new ProductList(page);
    this.categoryTree = new CategoryTreeFilter(page);
  }

  public async goto() {
    await this.page.goto("");
  }

  async verifyMainPage() {
    await Logger.logStep("Veryfing main page elements", async () => {
      const elements = [
        this.navBar.homeBtn,
        this.navBar.categoriesBtn,
        this.navBar.contacBtn,
        this.navBar.signInBtn,
        this.navBar.localeBtn,
        this.navBar.logoImg,
        this.navBar.bannerImg,
        this.search.searchInput,
        this.search.searchBtn,
        this.search.sortLookup,
        this.search.priceSlider,
      ];
      for (const element of elements) {
        await expect(element).toBeVisible();
      }
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
