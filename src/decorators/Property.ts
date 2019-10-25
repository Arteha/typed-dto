import "reflect-metadata";
import { PropertyOptions } from "../types";
import { SCHEMA_SYMBOL } from "../symbols/SCHEMA_SYMBOL";
import { Schema } from "../types/Schema";

export function Property(options: PropertyOptions | Array<PropertyOptions>, optional?: boolean)
{
    const schema: Schema = {
        options,
        optional: !!optional
    };

    // TODO: also save non optional to required meta
    return Reflect.metadata(SCHEMA_SYMBOL, schema);
}