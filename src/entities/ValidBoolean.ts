import { BooleanOptions } from "../types";
import { NotABooleanException } from "../exceptions/NotABooleanException";
import { ObjectMap } from "../types/ObjectMap";

export function ValidBoolean(map: ObjectMap, value: any, opts?: BooleanOptions): boolean
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