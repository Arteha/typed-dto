import { PropertyOptions } from "./property.options";

export type SchemaMeta = {
    options: PropertyOptions | Array<PropertyOptions>,
    optional: boolean
}