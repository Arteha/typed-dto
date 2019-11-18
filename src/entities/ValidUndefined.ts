import { UndefinedOptions } from "../types";
import { NotAnUndefinedException } from "../exceptions/NotAnUndefinedException";
import { ObjectMap } from "../types/ObjectMap";

export function ValidUndefined(map: ObjectMap, value: any, opts?: UndefinedOptions): undefined
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

    throw new NotAnUndefinedException(map, value);
}