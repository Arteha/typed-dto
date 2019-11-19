import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotAnUndefinedException extends ValidationException
{
    constructor(map: ObjectMap, value: any, ufMessage?: string)
    {
        super("NotAnUndefinedException", `Value is not type of "undefined".`, map, value, ufMessage);
    }
}