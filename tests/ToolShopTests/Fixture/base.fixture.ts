import { test as base } from '@playwright/test';
import { MainPage } from 'src/POM/ToolShop/pages/MainPage';
import { SignIn } from 'src/POM/ToolShop/pages/SignIn';


export const test = base.extend<{
    mainPage: MainPage;
    signIn: SignIn;
}>({
    mainPage: async ({page}, use) => {
        await use(new MainPage(page));
    },

    signIn: async ({page}, use) => {
        await use(new SignIn(page));
    }
});

