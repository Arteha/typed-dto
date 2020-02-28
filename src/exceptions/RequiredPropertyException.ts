import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class RequiredPropertyException extends ValidationException
{
    constructor(public readonly property: string, map: ObjectMap, value: any, ufMessage?: string)
    {
        super(`Property "${property}" is required.`, map, value, ufMessage);
    }
}