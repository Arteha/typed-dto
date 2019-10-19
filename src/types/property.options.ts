import { StringOptions } from "./string.options";
import { NumberOptions } from "./number.options";
import { BooleanOptions } from "./boolean.options";
import { DateOptions } from "./date.options";
import { NullOptions } from "./null.options";
import { UndefinedOptions } from "./undefined.options";
import {
    ValidString,
    ValidNumber,
    ValidBoolean,
    ValidDate,
    ValidNull,
    ValidUndefined
} from "../entities";

type StringPropertyType = typeof ValidString | "string";
type NumberPropertyType = typeof ValidNumber | "number";
type BooleanPropertyType = typeof ValidBoolean | "boolean";
type DatePropertyType = typeof ValidDate | "date";
type NullPropertyType = typeof ValidNull | "null";
type UndefinedPropertyType = typeof ValidUndefined | "undefined";

export type PropertyType = StringPropertyType
    | NumberPropertyType
    | BooleanPropertyType
    | DatePropertyType
    | NullPropertyType
    | UndefinedPropertyType;

export type PropertyOption<T extends PropertyType, V> = [T] | [T, V];

export type PropertyOptions = (
    PropertyOption<StringPropertyType, StringOptions>
    | PropertyOption<NumberPropertyType, NumberOptions>
    | PropertyOption<BooleanPropertyType, BooleanOptions>
    | PropertyOption<DatePropertyType, DateOptions>
    | PropertyOption<NullPropertyType, NullOptions>
    | PropertyOption<UndefinedPropertyType, UndefinedOptions>
);