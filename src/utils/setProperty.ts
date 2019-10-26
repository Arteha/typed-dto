import { PropertyOptions } from "../types";
import { ValidationException } from "../exceptions/ValidationException";
import { validateValue } from "./validateValue";

export function setProperty(target: Object, p: string, v: any, options: PropertyOptions): ValidationException | null
{
    try
    {
        target[ p ] = validateValue(v, options);
        return null;
    }
    catch (e)
    {
        return e;
    }
}