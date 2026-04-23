import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";
import { error } from "node:console";

export enum IMAGES  {
  Compass = 'Compass',
  Calendar = 'Calendar',
  Award = 'Award',
  Landscape = 'Landscape'
}

export class MouseOverPage extends MainPage {
  private readonly compassImg: Locator;
  private readonly calendarImg: Locator;
  private readonly awardImg: Locator;
  private readonly landscapeImg: Locator;

  constructor(page: Page) {
    super(page);
    this.compassImg = page.locator('img[src="img/compass.png"]');
    this.calendarImg = page.locator('img[src="img/calendar.png"]');
    this.awardImg = page.locator('img[src="img/award.png"]');
    this.landscapeImg = page.locator('img[src="img/landscape.png"]');
  }

  public async mouseOverImg(image: IMAGES): Promise<void> {
    await Logger.logStep(`Moving mouse over images`, async () => {
    
    switch(image) {
      case IMAGES.Compass: await this.compassImg.hover();break;
      case IMAGES.Calendar: await this.calendarImg.hover();break;
      case IMAGES.Award: await this.awardImg.hover();break;
      case IMAGES.Landscape: await this.landscapeImg.hover(); break;
      default : throw error('Bad image in method input');
    } 
  
    // Old code, just looping though elements and hovering on them
     //   const imgCapctions = ["Compass", "Calendar", "Award", "Landscape"];

    // for (const [index, element] of elements.entries()) {
    //   await element.hover();
    //   const imgCaption = await this.page
    //     .getByText(imgCapctions[index])
    //     .textContent();
    //   console.log(`Hovered element #${index+1}: ${imgCaption}`);
    // }
  })};
  async verifyCaption(image: IMAGES) {
    const imgCaption = await this.page
         .getByText(image)
        .textContent();
      expect(imgCaption).toEqual(image);
      console.log(`Hovered on element ${imgCaption}, caption is visible`);
  }

}
