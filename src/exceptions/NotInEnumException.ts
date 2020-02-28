import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotInEnumException extends ValidationException
{
    constructor(public readonly _enum: Array<string | number>, map: ObjectMap, value: any, ufMessage?: string)
    {
        super(`Value is not in: ${_enum.join(", ")}.`, map, value, ufMessage);
    }
}