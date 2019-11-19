import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class UnexpectedPropertyException extends ValidationException
{
    constructor(public readonly propertyName: string, map: ObjectMap, ufMessage?: string)
    {
        super("UnexpectedPropertyException", `Unexpected property "${propertyName}".`, map, undefined, ufMessage);
    }
}