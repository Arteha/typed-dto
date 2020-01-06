import { StringOptions } from "../types";
import { ValidString } from "../entities";

export function StringOrNull(value: any, opts: StringOptions = {}): string | null
{
    try
    {
        return ValidString(value, opts);
    }
    catch (e)
    {
        return null;
    }
}