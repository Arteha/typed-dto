import { PropertyOptions } from "./property.options";

export type ArrayOptions = {
    contains: PropertyOptions | Array<PropertyOptions>
    min?: number
    max?: number
}