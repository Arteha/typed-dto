import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotFitToRegExpException extends ValidationException
{
    constructor(public readonly regExp: RegExp, map: ObjectMap, value: string, ufMessage?: string)
    {
        super(`Value is not fit to RegExp: ${regExp.toString()}`, map, value, ufMessage);
    }
}