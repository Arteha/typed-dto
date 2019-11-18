import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class JSONParseException extends ValidationException
{
    constructor(message: string, map: ObjectMap, value: string, ufMessage?: string)
    {
        super("JSONParseException", message, map, value);
    }
}