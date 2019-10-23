import { DateOptions } from "../types";
import { ValidDate } from "../entities";

export function DateOrNull(value: any, opts?: DateOptions): Date | null
{
    try
    {
        return ValidDate(value, opts);
    }
    catch (e)
    {
        return null;
    }
}