

export class Logger {

    
    static async logStep<T>(message: string, action: () => Promise<T>): Promise<T> {
    const date = this.getTimestamp().toString();
    console.log(`${date} ${message}`);
    return await action();
    }

    static getTimestamp(): string{
        return`[${new Date().toISOString().toString()}]`
    }
}