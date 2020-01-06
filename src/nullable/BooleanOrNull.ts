import { BooleanOptions } from "../types";
import { ValidBoolean } from "../entities";

export function BooleanOrNull(value: any, opts: BooleanOptions = {}): boolean | null
{
    try
    {
        return ValidBoolean(value, opts);
    }
    catch (e)
    {
        return null;
    }
}