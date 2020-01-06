import { NullOptions } from "../types";
import { NotANullException } from "../exceptions/NotANullException";
import { ObjectMap } from "../types/ObjectMap";

export function ValidNull(value: any, opts: NullOptions, map: ObjectMap = []): null
{
    if(opts)
    {
        if(opts.strict)
        {
            if(value === null)
                return null;
        }
        else if(value == null || value == "null" || (!opts.strictString && value == "undefined"))
            return null;
    }
    else if(value == null || value == "null" || value == "undefined")
        return null;

    throw new NotANullException(map, value);
}