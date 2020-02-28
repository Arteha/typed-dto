import { BaseDTO } from "../";
import { SchemaOptions } from "../types/schema.options";
import { SCHEMA_OPTIONS_SYMBOL } from "../symbols/SCHEMA_OPTIONS_SYMBOL";

export function Schema<T extends { new(...args: any[]): BaseDTO }>(options: SchemaOptions = {}): Function
{
    return function (original: T): T
    {
        return class extends original
        {
            constructor(...args: any[])
            {
                super(...args);

                Reflect.defineMetadata(SCHEMA_OPTIONS_SYMBOL, options, this);
            }
        } as any;
    }
}