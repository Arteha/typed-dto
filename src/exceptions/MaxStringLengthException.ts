import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class MaxStringLengthException extends ValidationException
{
    constructor(public readonly max: number, map: ObjectMap, value: string, ufMessage?: string)
    {
        super("MaxStringLengthException", `String length more than: ${max}.`,map,  value, ufMessage);
    }
}