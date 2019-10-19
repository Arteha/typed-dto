import { UndefinedOptions } from "../types";
import { NotANullException } from "../exceptions/NotANullException";

export function ValidUndefined(value: any, opts?: UndefinedOptions): undefined
{
    if(opts && opts.strict)
    {
        if(value === null)
            return undefined;
    }
    else if(value == null || value == "null" || value == "undefined")
        return undefined;

    throw new NotANullException(value);
}