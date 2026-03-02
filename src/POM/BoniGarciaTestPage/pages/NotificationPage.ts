import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export interface NotificationData {
    title: string;
    body?: string;
    icon?: string;
    [key: string]: unknown; 
}

export class NotificationPage extends MainPage{

    readonly notificationBtn: Locator;
    readonly context: BrowserContext;

    constructor(page: Page){
        super(page);
        this.notificationBtn = page.getByText('Notify me');
        this.context = page.context();
    }

    public async mockNotifications() {
        await this.page.addInitScript(() => {
            (globalThis as any)._notifications = [];

            (globalThis as any).Notification = class MockNotification {
                constructor(title: string, options?: NotificationOptions) {
                    ((globalThis as any)._notifications as any[]).push({ title, ...options });
                }
                static permission = 'granted';
                static requestPermission = () => Promise.resolve('granted');
            } as any;
        });
    }

    public async notifyMe(){
       // await this.context.grantPermissions(['notifications']);
        await this.notificationBtn.click();
    }

    public async getNotifications(): Promise<NotificationData[]> {
        return await this.page.evaluate(() => (globalThis as any)._notifications ?? []);
    }

    public async verifyNotification(expected: NotificationData) {
        const notifications = await this.getNotifications();

        expect(notifications).toContainEqual(
            expect.objectContaining(expected)
        );
    }

}