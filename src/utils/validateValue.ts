import { PropertyOptions } from "../types";
import { ValidArray, ValidBoolean, ValidDate, ValidNull, ValidNumber, ValidString, ValidUndefined } from "../entities";
import { ObjectMap } from "../types/ObjectMap";
import { ValidationException } from "../exceptions/ValidationException";

export function validateValue(map: ObjectMap, value: any, options: PropertyOptions): any
{
    if (options.type == "any")
        return value;
    else if (options.type == "array")
        return ValidArray( value, options, map);
    else if (options.type == "boolean")
        return ValidBoolean(value, options, map);
    else if (options.type == "date")
        return ValidDate(value, options, map);
    else if (options.type == "null")
        return ValidNull(value, options, map);
    else if (options.type == "number")
        return ValidNumber(value, options, map);
    else if (options.type == "string")
        return ValidString(value, options, map);
    else if(options.type == "undefined")
        return ValidUndefined(value, options, map);
    else // typeof BaseDTO
    {
        try
        {
            return new options.type(value);
        }
        catch (e)
        {
            if(e instanceof ValidationException)
                e.map = map.concat(e.map);
            throw e;
        }
    }
}