import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotAnIntegerException extends ValidationException
{
    constructor(map: ObjectMap, value: number, ufMessage?: string)
    {
        super("NotAnIntegerException", `Number is not an integer.`, map, value, ufMessage);
    }
}