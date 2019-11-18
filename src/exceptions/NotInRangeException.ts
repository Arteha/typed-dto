import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotInRangeException extends ValidationException
{
    constructor(public readonly ranges: Array<[number, number]>, map: ObjectMap, value: number, ufMessage?: string)
    {
        super("NotInRangeException", `Number is not in ranges: ${JSON.stringify(ranges)}.`, map, value, ufMessage);
    }
}