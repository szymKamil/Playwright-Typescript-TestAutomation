import { Locator, Page } from "@playwright/test";





export class ChatAssistant {
  readonly chatBtn: Locator;
  readonly chatHeader: Locator;
  readonly chatClose: Locator;
  readonly chatDefaultMsg: Locator;
  readonly chatOptionFindProduct: Locator;
  readonly chatOptionOrderProduct: Locator;
  readonly chatOptionCheckout: Locator;
  readonly chatOptionCreateTicket: Locator;
  readonly chatMessageInput: Locator;
  readonly chatBtnSendMsg: Locator;
  readonly chatProduct: Locator;

  constructor(page: Page) {
    this.chatBtn = page.getByRole("button", { name: "Open chat" });
    this.chatHeader = page.getByRole("textbox", { name: "Chat Assistant" });
    this.chatClose = page.getByRole("button", { name: "Close chat" });
    this.chatDefaultMsg = page.getByText(" Hi! How can I help you today?");
    this.chatOptionFindProduct = page.getByRole("button", {
      name: " Find a product ",
    });
    this.chatOptionOrderProduct = page.getByRole("button", {
      name: " Order a product ",
    });
    this.chatOptionCheckout = page.getByRole("button", { name: " Checkout " });
    this.chatOptionCreateTicket = page.getByRole("button", {
      name: " Create support ticket ",
    });
     this.chatMessageInput = page.getByRole("textbox", { name: " Type your message... " });
    this.chatBtnSendMsg = page.getByRole("button", { name: "Send message" });
    this.chatProduct = page.locator("div[data-test='chat-product']");
    
  }
}
