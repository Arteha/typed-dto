import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotAnArrayException extends ValidationException
{
    constructor(map: ObjectMap, value: any, ufMessage?: string)
    {
        super("NotAnArrayException", `Value is not an Array.`, map, value, ufMessage);
    }
}