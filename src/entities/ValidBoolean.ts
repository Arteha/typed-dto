import { ArrayOptions, BooleanOptions } from "../types";
import { NotABooleanException } from "../exceptions/NotABooleanException";
import { ObjectMap } from "../types/ObjectMap";

export function ValidBoolean(value: any, opts: BooleanOptions, map: ObjectMap = []): boolean
{
    if(typeof value == "boolean")
        return value;

    if(!opts || !opts.strict)
    {
        if(value == "true" || value == 1)
            return true;
        else if(value == "false" || value == 0)
            return false;
    }

    throw new NotABooleanException(map, value);
}