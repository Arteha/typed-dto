import { NumberOptions } from "../types";
import { ValidNumber } from "../entities";

export function NumberOrNull(value: any, opts: NumberOptions = {}): number | null
{
    try
    {
        return ValidNumber(value, opts);
    }
    catch (e)
    {
        return null;
    }
}