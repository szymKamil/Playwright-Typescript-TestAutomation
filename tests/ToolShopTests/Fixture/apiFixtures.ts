import { test as base } from "../Fixture/base.fixture";
import { request, expect } from "@playwright/test";
import { env } from "node:process";
import * as constants from "../../../src/POM/ToolShop/utils/constans";

type APIFIxtures = {
  userType: keyof typeof constants.users;
  credentials: {
    email: string;
    password: string;
  };
  loggUserAPI: void;
};

export const test = base.extend<APIFIxtures>({
  userType: ["admin", { option: true }],

  credentials: async ({ userType }, use) => {
    const user = constants.users[userType];
    if (!user?.email || !user?.password) {
      throw new Error(`Missing credentials for userType: ${userType}`);
    } else {
      await use({
        email: user.email,
        password: user.password,
      });
    }
  },

  loggUserAPI: async ({ credentials, page }, use) => {
    const context = await request.newContext({
      baseURL: `${constants.TOOLSHOP_API}`,
    });
    const response = await context.post("/users/login", {
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    const body = await response.json();
    await expect(response).toBeOK();
    await page.addInitScript((token) => {
      localStorage.setItem("auth-token", token);
    }, body.access_token);
    await page.goto("/");
    await use();
  },
});
