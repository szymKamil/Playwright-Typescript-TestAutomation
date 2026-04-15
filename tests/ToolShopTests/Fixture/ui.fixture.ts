import { test as base } from "./apiFixtures";


type UIFixtures = {
  credentials: {
    email: string;
    password: string;
  };
  loggUserUI: void;
};



export const test = base.extend<UIFixtures>({
  // credentials: async ({}, use) => {
  //   await use({
  //     email: process.env.TOOLSHOP_ADMIN_LOGIN!,
  //     password: process.env.TOOLSHOP_ADMIN_PASSWORD!,
  //   });
  // },

  loggUserUI: async ({ signIn, credentials }, use) => {
    await signIn.goto();
    console.log(credentials.email, credentials.password);
    await signIn.logIn(credentials.email, credentials.password);
    await use();
  },
});
