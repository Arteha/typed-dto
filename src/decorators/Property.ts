import "reflect-metadata";
import { PropertyOptions } from "../types";

export const schemaSymbol = Symbol("schema");

export function Property(options: PropertyOptions | Array<PropertyOptions>)
{
    return Reflect.metadata(schemaSymbol, options);
}