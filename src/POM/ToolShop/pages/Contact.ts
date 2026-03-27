import { Locator, Page } from "@playwright/test";

export class Contact {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailAdressInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly attachmentInput: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.getByRole("textbox", { name : "First name" });
    this.lastNameInput = page.getByRole("textbox", { name : "Last name" });
    this.emailAdressInput = page.getByRole("textbox", { name : "Email adress" });
    this.subjectInput = page.getByRole("textbox", { name : "Subject" });
    this.messageInput = page.getByRole("textbox", { name : "Message" });
    this.attachmentInput = page.getByRole("textbox", { name: "Attachment" });
  }


  
}
