import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class MaxNumberException extends ValidationException
{
    constructor(public readonly max: number, map: ObjectMap, value: number, ufMessage?: string)
    {
        super("MaxNumberException", `Number more than: ${max}.`, map, value, ufMessage);
    }
}