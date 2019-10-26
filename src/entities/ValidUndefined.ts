import { UndefinedOptions } from "../types";
import { NotAnUndefinedException } from "../exceptions/NotAnUndefinedException";

export function ValidUndefined(value: any, opts?: UndefinedOptions): undefined
{
    if(opts)
    {
        if(opts.strict)
        {
            if(value === undefined)
                return undefined;
        }
        else if(value == undefined || value == "undefined" || (!opts.strictString && value == "null"))
            return undefined;
    }
    else if(value == undefined || value == "undefined" || value == "null")
        return undefined;

    throw new NotAnUndefinedException(value);
}