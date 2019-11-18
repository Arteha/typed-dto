import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotAStringException extends ValidationException
{
    constructor(map: ObjectMap, value: any, ufMessage?: string)
    {
        super("NotAStringException", `Value is not type of "string".`, map, value, ufMessage);
    }
}