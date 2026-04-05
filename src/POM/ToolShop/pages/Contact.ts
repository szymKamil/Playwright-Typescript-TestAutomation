import { Locator, Page } from "@playwright/test";
import { Actions } from "../../../_Tools/Actions";

export class Contact {
  readonly actions: Actions;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailAdressInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly attachmentInput: Locator;
  readonly sendBtn: Locator;
  readonly contactSucessMessage: Locator;

  constructor(page: Page) {
    this.actions = new Actions(page);
    this.firstNameInput = page.getByRole("textbox", { name : "First name" });
    this.lastNameInput = page.getByRole("textbox", { name : "Last name" });
    this.emailAdressInput = page.getByRole("textbox", { name : "Email address" });
    this.subjectInput = page.getByRole("combobox", { name : "Subject" });
    this.messageInput = page.getByRole("textbox", { name : "Message" });
    this.attachmentInput = page.getByRole("button", { name: "Attachment" });
    this.sendBtn = page.getByRole("button", { name: "Send" });
    this.contactSucessMessage = page.getByText("Thanks for your message! We will contact you shortly.");

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


}

