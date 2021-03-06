import "reflect-metadata";
import { NotEmptyArray, PropertyOptions } from "../types";
import { SCHEMA_SYMBOL } from "../symbols/SCHEMA_SYMBOL";
import { PropertyMeta } from "../types";
import { BaseDTO } from "..";
import { REQUIRED_PROPERTIES_SYMBOL } from "../symbols/REQUIRED_PROPERTIES_SYMBOL";

export function Property(options: PropertyOptions | NotEmptyArray<PropertyOptions>, optional?: boolean)
{
    const schema: PropertyMeta = {
        options,
        optional: !!optional
    };

    return function (target: BaseDTO, propertyKey: string | undefined): void
    {
        if (propertyKey == undefined)
            throw new TypeError();

        const requiredMeta = Reflect.getMetadata(REQUIRED_PROPERTIES_SYMBOL, target);
        const required: Record<string, boolean> = requiredMeta || {};
        required[propertyKey] = !optional;
        if(!requiredMeta)
            Reflect.defineMetadata(REQUIRED_PROPERTIES_SYMBOL, required, target);

        Reflect.defineMetadata(SCHEMA_SYMBOL, schema, target, propertyKey);
    };
}