import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class ArrayMaxLengthException extends ValidationException
{
    constructor(public readonly max: number, map: ObjectMap, array: Array<any>, ufMessage?: string)
    {
        super(`Array length more than: ${max}.`, map, array, ufMessage);
    }
}