import { DateOptions } from "../types";
import { NotADateException } from "../exceptions/NotADateException";

export function ValidDate(value: any, opts?: DateOptions): Date
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

    throw new NotADateException(value);
}