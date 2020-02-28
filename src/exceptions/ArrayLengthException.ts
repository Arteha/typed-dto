import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class ArrayLengthException extends ValidationException
{
    constructor(public readonly length: number, map: ObjectMap, array: Array<any>, ufMessage?: string)
    {
        super(`Array length != ${length}.`, map, array, ufMessage);
    }
}