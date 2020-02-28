import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class MinNumberException extends ValidationException
{
    constructor(public readonly min: number, map: ObjectMap, value: number, ufMessage?: string)
    {
        super(`Number less than: ${min}.`, map, value, ufMessage);
    }
}