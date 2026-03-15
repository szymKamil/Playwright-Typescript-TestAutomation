import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export class MouseOverPage extends MainPage {
  private readonly compassImg: Locator;
  private readonly calsendarImg: Locator;
  private readonly awardImg: Locator;
  private readonly landscapeImg: Locator;

  constructor(page: Page) {
    super(page);

    this.compassImg = page.locator('img[src="img/compass.png"]');
    this.calsendarImg = page.locator('img[src="img/calendar.png"]');
    this.awardImg = page.locator('img[src="img/award.png"]');
    this.landscapeImg = page.locator('img[src="img/landscape.png"]');
  }

  public async mouseOverImg(): Promise<void> {
    await Logger.logStep(`Moving mouse over images`, async () => {
    const elements = [
      this.compassImg,
      this.calsendarImg,
      this.awardImg,
      this.landscapeImg,
    ];
    const imgCapctions = ["Compass", "Calendar", "Award", "Landscape"];

    for (const [index, element] of elements.entries()) {
      await element.hover();
      const imgCaption = await this.page
        .getByText(imgCapctions[index])
        .textContent();
      console.log(`Hovered element #${index+1}: ${imgCaption}`);
    }
  })};
}
