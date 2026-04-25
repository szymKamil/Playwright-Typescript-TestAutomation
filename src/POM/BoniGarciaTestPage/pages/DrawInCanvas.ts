import { expect, Page } from "@playwright/test";

import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export class DrawInCanvas extends MainPage {
  private readonly canvas;

  constructor(page: Page) {
    super(page);
    this.canvas = page.locator("#my-canvas");
  }

  async drawInCanvas(...args: DrawningCoords[]): Promise<void> {
    await Logger.logStep("Drawning in canvas", async () => {
      await expect(this.canvas).toBeVisible();
      let box = await this.canvas.boundingBox();
      if (box) {
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;
        await this.page.mouse.click(startX, startY);
        await this.page.mouse.down();
        for (const coord of args) {
          await this.page.mouse.move(startX + coord.x, startY + coord.y);
        }
        await this.page.mouse.up();
      }
    });
  }
  async defaultDraw(): Promise<void> {
    await this.drawInCanvas(
      { x: 30, y: -22 },
      { x: 50, y: 0 },
      { x: 20, y: 50 },
      { x: -50, y: 10 },
      { x: 60, y: -50 },
    );
  }

  async visulatTest() {
    await this.actions.pageVisualTest("canvas-page");
  }
}

type DrawningCoords = Readonly<{
  x: number;
  y: number;
}>;
