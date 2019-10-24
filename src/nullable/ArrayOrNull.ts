import { ArrayOptions } from "../types";
import { ValidArray } from "../entities";

export function ArrayOrNull<T>(value: any, opts?: ArrayOptions): Array<T> | null
{
    try
    {
        return ValidArray(value, opts);
    }
    catch (e)
    {
        return null;
    }
}