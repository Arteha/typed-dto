import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class InvalidStringLengthException extends ValidationException
{
    constructor(public readonly length: number, map: ObjectMap, value: string, ufMessage?: string)
    {
        super(`String length not equal: ${length}.`, map, value, ufMessage);
    }
}