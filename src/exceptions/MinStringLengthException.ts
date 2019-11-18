import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class MinStringLengthException extends ValidationException
{
    constructor(public readonly min: number, map: ObjectMap, value: string, ufMessage?: string)
    {
        super("MinStringLengthException", `String length less than: ${min}.`, map, value, ufMessage);
    }
}