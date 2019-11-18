import { BaseDTO } from "../";

export function Schema<T extends { new(...args: any[]): BaseDTO }>(original: T): T
{
    return class extends original
    {
        constructor(...args: any[])
        {
            super(...args);

            console.warn(`[typed-dto] deprecation warning: Decorator "Schema" no longer needed.`);
        }
    } as any;
}