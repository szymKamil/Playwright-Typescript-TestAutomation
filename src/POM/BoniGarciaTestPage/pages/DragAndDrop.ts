import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export class DragAndDrop extends MainPage {
  private readonly draggablePanel: Locator;
  private readonly targetPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.draggablePanel = page.locator("#draggable");
    this.targetPanel = page.locator("#target");
  }

  async dragAndDropPanel() {
    await Logger.logStep("Dragging element to target coords", async () => {
      let startingCoords = await this.draggablePanel.boundingBox();
      let targetCoords = await this.targetPanel.boundingBox();
      console.log(
        "Starting coords: " + startingCoords?.x + ", " + startingCoords?.y,
      );
      console.log("Target coords: " + targetCoords?.x + ", " + targetCoords?.y);
      await this.draggablePanel.dragTo(this.targetPanel);
      let endingCoords = await this.draggablePanel.boundingBox();
      endingCoords?.x == targetCoords?.x && endingCoords?.y == targetCoords?.y
        ? console.log(
            "Sucess! Ending coords: " +
              endingCoords?.x +
              ", " +
              endingCoords?.y,
          )
        : console.log("Drag and drop failed");
    });
  }
}
