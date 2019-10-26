export declare type ObjectType<T> = {
    new(): T;
} | Function;

export type AsAttributes<T> = {
    [P in keyof T]: T[P]
};

export interface NotEmptyArray<T> extends Array<T>
{
    0: T
}