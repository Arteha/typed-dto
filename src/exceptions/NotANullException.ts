import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotANullException extends ValidationException
{
    constructor(map: ObjectMap, value: any, ufMessage?: string)
    {
        super(`Value is not type of "null".`, map, value, ufMessage);
    }
}