import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotADateException extends ValidationException
{
    constructor(map: ObjectMap, value: any, ufMessage?: string)
    {
        super("NotADateException", `Value is not a Date.`, map, value, ufMessage);
    }
}