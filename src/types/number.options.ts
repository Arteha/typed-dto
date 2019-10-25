import { IBaseOptions } from "./IBaseOptions";

export type NumberEnumType = Array<number>;

export interface INumberOptions extends IBaseOptions
{
    strict?: boolean
    as: "integer" | "real"
    enum?: NumberEnumType
    ranges?: Array<[number, number]>
    min?: number
    max?: number
}