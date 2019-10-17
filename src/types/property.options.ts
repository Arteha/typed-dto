import { StringOptions } from "./string.options";
import { NumberOptions } from "./number.options";

export type PropertyType = "string" | "number" | "boolean" | "date" | "null" | "undefined";

export type Property<T extends PropertyType, V> = {
    type: T
    options?: V
}

export type PropertyOptions = (
    Property<"string", StringOptions>
    | Property<"number", NumberOptions>
);