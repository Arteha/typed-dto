import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotABooleanException extends ValidationException
{
    constructor(map: ObjectMap, value: any, ufMessage?: string)
    {
        super("NotABooleanException", `Value is not type of "boolean".`, map, value, ufMessage);
    }
}