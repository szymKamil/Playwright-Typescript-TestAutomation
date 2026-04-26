import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { Logger } from "../../../_Tools/Logger";

export enum AlertParameter {
  Accept = "accept",
  Dismiss = "dismiss",
}

interface AlertConfig {
  btn: Locator;
  parameter: AlertParameter;
  input?: string;
}

export class DialgBoxesPage extends MainPage {
  private readonly launchAlertBtn: Locator;
  private readonly launchConfirmBtn: Locator;
  private readonly confirmInfo: Locator;
  private readonly launchPromptBtn: Locator;
  private readonly promptInfo: Locator;
  private readonly launchModalBtn: Locator;
  private readonly modal: Locator;
  private readonly modalInfo: Locator;
  private readonly modalBody: Locator;
  private readonly modalClose: Locator;
  private readonly modalSave: Locator;

  constructor(page: Page) {
    super(page);
    this.launchAlertBtn = this.page.locator("#my-alert");
    this.launchConfirmBtn = this.page.locator("#my-confirm");
    this.confirmInfo = this.page.locator("#confirm-text");
    this.launchPromptBtn = this.page.locator("#my-prompt");
    this.promptInfo = this.page.locator("#prompt-text");
    this.launchModalBtn = this.page.locator("#my-modal");
    this.modal = this.page.locator("#example-modal");
    this.modalInfo = this.page.locator("#modal-text");
    this.modalBody = this.modal.locator("div.modal-body");
    this.modalClose = this.modal.locator("button.btn-secondary");
    this.modalSave = this.modal.locator("button.btn-primary");
  }

  async alertRunner(alertConfig: AlertConfig) {
    this.page.once("dialog", async (alert: any) => {
      console.log("Dialog type:", alert.type());
      console.log("Dialog message:", alert.message());
      const alertMsg = await alert.message();
      console.log("Alert message is " + alertMsg);
      if (alertConfig.parameter === "accept" || alertConfig.input) {
        await alert.accept(alertConfig.input);
      } else {
        await alert.dismiss();
      }
    });
    await alertConfig.btn.click();
  }

  public async launchAlert() {
    await Logger.logStep("Launching alert", async () => {
      await this.alertRunner({
        btn: this.page.locator("#my-alert"),
        parameter: AlertParameter.Dismiss,
      });
    });
  }

  public async launchConfirm(parameter: AlertParameter) {
    await Logger.logStep("Lauching confirm", async () => {
      await this.alertRunner({
        btn: this.page.locator("#my-confirm"),
        parameter: parameter,
      });
      if (parameter == "accept") {
        await expect(this.confirmInfo).toHaveText("You chose: true");
      } else {
        await expect(this.confirmInfo).toHaveText("You chose: false");
      }
    });
  }

  public async launchPromt(parameter: AlertParameter, input: string) {
    await Logger.logStep("Lauching prompt", async () => {
      await this.alertRunner({
        btn: this.launchPromptBtn,
        parameter: parameter,
        input: input,
      });
      await expect(this.promptInfo).toHaveText("You typed: " + input);
    });
  }
  public async launchModal(parameter: AlertParameter) {
    await Logger.logStep("Lauching modal", async () => {
      await this.launchModalBtn.click();
      await expect(this.modal).toBeVisible();
      await expect(this.modalBody).toHaveText("This is the modal body");
      if (parameter == "accept") {
        await this.modalSave.click();
        await expect(this.modalInfo).toHaveText("You chose: Save changes");
      } else {
        await this.modalClose.click();
        await expect(this.modalInfo).toHaveText("You chose: Close");
      }
    });
  }
}
