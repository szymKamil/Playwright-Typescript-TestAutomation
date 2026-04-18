import { Locator, Page, expect } from "@playwright/test";
import { Actions } from "../../../_Tools/Actions";
import { verify } from "crypto";

type ErrorKey = keyof Contact["errorsMap"];

export class Contact {
  readonly actions: Actions;
  readonly contactDiv: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailAdressInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly attachmentInput: Locator;
  readonly sendBtn: Locator;
  readonly contactSucessMessage: Locator;
  readonly errorsMap;

  constructor(page: Page) {
    this.actions = new Actions(page);
    this.contactDiv = page.locator("form.ng-pristine");
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.emailAdressInput = page.getByRole("textbox", {
      name: "Email address",
    });
    this.subjectInput = page.getByRole("combobox", { name: "Subject" });
    this.messageInput = page.getByRole("textbox", { name: "Message" });
    this.attachmentInput = page.getByRole("button", { name: "Attachment" });
    this.sendBtn = page.getByRole("button", { name: "Send" });
    this.contactSucessMessage = page.getByText(
      "Thanks for your message! We will contact you shortly.",
    );

    //Errors
    this.errorsMap = {
      firstName: page.getByText("First name is required" ),
      lastName: page.getByText("Last name is required" ),
      email: page.getByText(" Email is required" ),
      subject: page.getByText("Subject is required" ),
      message: page.getByText("Message is required" ),
    };
  }

  async verifyContactPageElements() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailAdressInput).toBeVisible();
    await expect(this.subjectInput).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.attachmentInput).toBeVisible();
    await expect(this.sendBtn).toBeVisible();
    await this.actions.pageVisualTest("ContactPage");
  }

  async insertFirstName(firstName: string) {
    await this.actions.insertText(this.firstNameInput, firstName);
  }

  async insertLastName(lastName: string) {
    await this.actions.insertText(this.lastNameInput, lastName);
  }

  async insertEmail(email: string) {
    await this.actions.insertText(this.emailAdressInput, email);
  }

  async insertSubject(subject: string) {
    await this.actions.selectOption(this.subjectInput, subject);
  }

  async insertMessage(message: string) {
    await this.actions.insertText(this.messageInput, message);
  }

  async insertAttachment(attachment: string) {
    await this.actions.sendFile(this.attachmentInput, attachment);
  }

  async fillContactForm(
    firstName?: string,
    lastName?: string,
    email?: string,
    subject?: string,
    message?: string,
    attachment?: string,
  ) {
    if (firstName) await this.insertFirstName(firstName);
    if (lastName) await this.insertLastName(lastName);
    if (email) await this.insertEmail(email);
    if (subject) await this.insertSubject(subject);
    if (message) await this.insertMessage(message);
    if (attachment) await this.insertAttachment(attachment);
  }

  async submitForm() {
    await this.sendBtn.click();
  }

  async verifyTranslation(translation: Object) {
    await this.actions.verifyTranslation(this.contactDiv, translation);
  }

  async expectErrors(errors: ErrorKey[]) {
    for (const key of errors) {
      await expect(this.errorsMap[key]).toBeVisible();
    }
  }
}
