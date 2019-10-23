import { StringOptions } from "./string.options";
import { NumberOptions } from "./number.options";
import { BooleanOptions } from "./boolean.options";
import { DateOptions } from "./date.options";
import { NullOptions } from "./null.options";
import { UndefinedOptions } from "./undefined.options";
import { ArrayOptions } from "./array.options";

type ArrayPropertyType = "array";
type StringPropertyType = "string";
type NumberPropertyType = "number";
type BooleanPropertyType = "boolean";
type DatePropertyType = "date";
type NullPropertyType = "null";
type UndefinedPropertyType = "undefined";

export type PropertyType = ArrayPropertyType
    | StringPropertyType
    | NumberPropertyType
    | BooleanPropertyType
    | DatePropertyType
    | NullPropertyType
    | UndefinedPropertyType;

export type PropertyOption<T extends PropertyType, O> = {type: T, opts?: O};

export type PropertyOptions = (
    PropertyOption<ArrayPropertyType, ArrayOptions>
    | PropertyOption<StringPropertyType, StringOptions>
    | PropertyOption<NumberPropertyType, NumberOptions>
    | PropertyOption<BooleanPropertyType, BooleanOptions>
    | PropertyOption<DatePropertyType, DateOptions>
    | PropertyOption<NullPropertyType, NullOptions>
    | PropertyOption<UndefinedPropertyType, UndefinedOptions>
);