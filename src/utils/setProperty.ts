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
    map.push(p);
    try
    {
        target[ p ] = validateValue(map, v, options);
        map.pop();
        return null;
    }
    catch (e)
    {
        map.pop();
        return e;
    }
}