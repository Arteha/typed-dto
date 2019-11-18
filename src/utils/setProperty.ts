import { PropertyOptions } from "../types";
import { ValidationException } from "../exceptions/ValidationException";
import { validateValue } from "./validateValue";
import { ObjectMap } from "../types/ObjectMap";

export function setProperty(
    map: ObjectMap,
    target: Object, options: PropertyOptions,
    p: string, v: any
): ValidationException | null
{
    try
    {
        map.push(p);
        target[ p ] = validateValue(map, v, options);
        map.pop();
        return null;
    }
    catch (e)
    {
        return e;
    }
}