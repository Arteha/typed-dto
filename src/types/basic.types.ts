export declare type ObjectType<T> = {
    new(): T;
} | Function;

export type AsAttributes<T> = {
    [P in keyof T]: T[P]
} | Function;