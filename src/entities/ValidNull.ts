import { DateOptions } from "../types";
import { NotANullException } from "../exceptions/NotANullException";

export function ValidNull(value: any, opts?: DateOptions): null
{
    if(opts && opts.strict)
    {
        if(value === null)
            return null;
    }
    else if(value == null || value == "null" || value == "undefined")
        return null;

    throw new NotANullException(value);
}