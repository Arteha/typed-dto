export declare type ObjectType<T> = {
    new(): T;
} | Function;

type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];
type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
type ExtractMethodsKeys<T> = { [K in keyof T]-?: T[K] extends Function ? K : never }[keyof T];

type SimpleValue = number | string | boolean | null | undefined;

type SimplifiedValue<T> = T extends SimpleValue ? T : T extends Object ? AsAttributes<T> : T;
type SimplifiedArray<T> = (T extends (infer U)[] ? SimplifiedValue<U> : T)[];
type SimplifiedProperty<T> = T extends SimpleValue ? T : T extends Array<any> ? SimplifiedArray<T> : SimplifiedValue<T>;

export type AsAttributes<T> = {
    [K in Exclude<RequiredKeys<T>, ExtractMethodsKeys<T>>]: SimplifiedProperty<T[K]>
} & {
    [K in Exclude<OptionalKeys<T>, ExtractMethodsKeys<T>>]?: SimplifiedProperty<T[K]>
};

export interface NotEmptyArray<T> extends Array<T>
{
    0: T
}