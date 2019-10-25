import { PropertyOptions } from "./property.options";

export type Schema = {
    options: PropertyOptions | Array<PropertyOptions>,
    optional: boolean
}