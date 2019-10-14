export declare type ObjectType<T> = {
    new(): T;
} | Function;

export type AsAttributes<T> = {
    [P in keyof T]: T[P]
} | Function;

export type PropertyType = "string" | "number" | "boolean" | "date";
export type DataType = string | number | boolean | Date;

export type PropertyOptions = {
    type: PropertyType | Array<PropertyType>
} | {
    enum: Array<DataType>
};