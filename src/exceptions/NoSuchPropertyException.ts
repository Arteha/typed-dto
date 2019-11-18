import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NoSuchPropertyException extends ValidationException
{
    constructor(public readonly propertyName: string, map: ObjectMap, ufMessage?: string)
    {
        super("NoSuchPropertyException", `Property "${propertyName}" does not exist.`, map, undefined, ufMessage);
    }
}