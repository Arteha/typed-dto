import { PropertyOptions } from "../types";
import { ValidArray, ValidBoolean, ValidDate, ValidNull, ValidNumber, ValidString, ValidUndefined } from "../entities";

export function validateValue(value: any, options: PropertyOptions): any
{
    if (options.type == "any")
        return value;
    else if (options.type == "array")
        return ValidArray(value, options);
    else if (options.type == "boolean")
        return ValidBoolean(value, options);
    else if (options.type == "date")
        return ValidDate(value, options);
    else if (options.type == "null")
        return ValidNull(value, options);
    else if (options.type == "number")
        return ValidNumber(value, options);
    else if (options.type == "string")
        return ValidString(value, options);
    else if(options.type == "undefined")
        return ValidUndefined(value, options);
    else // typeof BaseDTO
        return new options.type(value);
}