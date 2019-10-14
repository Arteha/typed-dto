import "reflect-metadata";
import { PropertyOptions } from "../types";

export const schemaSymbol = Symbol("schema");

export function Property(options: PropertyOptions)
{
    console.log("Property:", options);
    return Reflect.metadata(schemaSymbol, options);
}