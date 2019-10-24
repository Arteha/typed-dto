import { UndefinedOptions } from "../types";
import { NotAnUndefinedException } from "../exceptions/NotAnUndefinedException";

export function ValidUndefined(value: any, opts?: UndefinedOptions): undefined
{
    if(opts && opts.strict)
    {
        if(value === null)
            return undefined;
    }
    else if(value == null || value == "null" || value == "undefined")
        return undefined;

    throw new NotAnUndefinedException(value);
}