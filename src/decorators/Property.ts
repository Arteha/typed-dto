import "reflect-metadata";
import { PropertyOptions } from "../types";

export const schemaSymbol = Symbol("schema");

export function Property(options: PropertyOptions)
{
    return Reflect.metadata(schemaSymbol, options);
}