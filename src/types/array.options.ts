import { PropertyOptions } from "./property.options";
import { NotEmptyArray } from "./basic.types";

export type ArrayOptions = {
    has: PropertyOptions | NotEmptyArray<PropertyOptions>
    length?: number
    minLength?: number
    maxLength?: number
}