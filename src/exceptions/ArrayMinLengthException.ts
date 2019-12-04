import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class ArrayMinLengthException extends ValidationException
{
    constructor(public readonly min: number, map: ObjectMap, array: Array<any>, ufMessage?: string)
    {
        super("ArrayMinLengthException", `Array length less than: ${min}.`, map, array, ufMessage);
    }
}