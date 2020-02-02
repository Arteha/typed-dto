export declare type ObjectType<T> = {
    new(): T;
} | Function;

export type AsAttributes<T> = {
    [K in keyof T]: T[K] extends Function ? never : T[K]
};

export interface NotEmptyArray<T> extends Array<T>
{
    0: T
}