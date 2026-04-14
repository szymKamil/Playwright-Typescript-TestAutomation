import { SignIn } from "src/POM/ToolShop/pages/SignIn";
import { test as base } from "./base.fixture";
import { APIRequestContext, request, expect } from "@playwright/test";
import * as constants from "../../../src/POM/ToolShop/utils/constans";
import { createDecipheriv } from "node:crypto";

type Auth = {
  credentials: {
    email: string;
    password: string;
  };
  loggedUserUI: void;
  loggedUserAPI: void;
};

export const test = base.extend<Auth>({
  credentials: async ({}, use) => {
    await use({
      email: process.env.USER_EMAIL!,
      password: process.env.USER_PASSWORD!,
    });
  },

  loggedUserUI: async ({ signIn, credentials }, use) => {
    await signIn.goto();
    await signIn.logIn(credentials.email, credentials.password);

    await use();
  },

  loggedUserAPI: async ({ credentials, page }, use) => {
    const context = await request.newContext({
      baseURL: `${constants.TOOLSHOP_API}`,
    });
    const response = await context.post("/users/login", {
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    await expect(response).toBeOK();

    await use();
  },
});

//`${const.TOOLSHOP_API}/users/login`
