import { PropertyOptions } from "../types";
import { ValidArray, ValidBoolean, ValidDate, ValidNull, ValidNumber, ValidString, ValidUndefined } from "../entities";
import { ObjectMap } from "../types/ObjectMap";
import { MAP_SYMBOL } from "../symbols/MAP_SYMBOL";

export function validateValue(map: ObjectMap, value: any, options: PropertyOptions): any
{
    if (options.type == "any")
        return value;
    else if (options.type == "array")
        return ValidArray(map, value, options);
    else if (options.type == "boolean")
        return ValidBoolean(map, value, options);
    else if (options.type == "date")
        return ValidDate(map, value, options);
    else if (options.type == "null")
        return ValidNull(map, value, options);
    else if (options.type == "number")
        return ValidNumber(map, value, options);
    else if (options.type == "string")
        return ValidString(map, value, options);
    else if(options.type == "undefined")
        return ValidUndefined(map, value, options);
    else // typeof BaseDTO
    {
        const instance = new options.type(value);
        return (instance as any)._validate();
    }
}