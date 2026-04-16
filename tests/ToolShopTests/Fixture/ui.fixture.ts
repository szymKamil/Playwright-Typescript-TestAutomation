import { test as base } from "./apiFixtures";

type UIFixtures = {
  credentials: {
    email: string;
    password: string;
  };
  loggUserUI: void;
};

export const test = base.extend<UIFixtures>({
  loggUserUI: async ({ login: signIn, credentials }, use) => {
    await signIn.goto();
    console.log(credentials.email, credentials.password);
    await signIn.logIn(credentials.email, credentials.password);
    await use();
  },
});
