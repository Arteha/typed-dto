import { DateOptions } from "../types";
import { NotADateException } from "../exceptions/NotADateException";
import { ObjectMap } from "../types/ObjectMap";

export function ValidDate(map: ObjectMap, value: any, opts: DateOptions): Date
{
    if(value instanceof Date)
        return value;

    if(!opts || !opts.strict)
    {
        if(value !== null)
        {
            const date = new Date(value);
            if(date.toString() != "Invalid Date")
                return date;
        }
    }

    throw new NotADateException(map, value);
}