import { PropertyOptions } from "../types";
import { ValidationException } from "../exceptions/ValidationException";
import {
    ValidArray,
    ValidBoolean,
    ValidDate,
    ValidNull,
    ValidNumber,
    ValidString,
    ValidUndefined
} from "../entities";

export function setProperty(instance: Object, p: string, value: any, options: PropertyOptions): ValidationException | null
{
    try
    {
        if (options.type == "array")
            instance[ p ] = ValidArray(value, options);
        else if (options.type == "boolean")
            instance[ p ] = ValidBoolean(value, options);
        else if (options.type == "date")
            instance[ p ] = ValidDate(value, options);
        else if (options.type == "null")
            instance[ p ] = ValidNull(value, options);
        else if (options.type == "number")
            instance[ p ] = ValidNumber(value, options);
        else if (options.type == "string")
            instance[ p ] = ValidString(value, options);
        else if(options.type == "undefined")
            instance[ p ] = ValidUndefined(value, options);
        else // typeof BaseDTO
            instance[ p ] = new options.type(value);

        return null;
    }
    catch (e)
    {
        return e;
    }
}