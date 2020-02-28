import { PropertyOptions } from "./property.options";

export type PropertyMeta = {
    options: PropertyOptions | Array<PropertyOptions>,
    optional: boolean
}