import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class NotAllowedCharacterException extends ValidationException
{
    constructor(public readonly allowed: string, map: ObjectMap, value: any, ufMessage?: string)
    {
        super("NotAllowedCharacterException", `Allowed are: "${allowed}".`, map, value, ufMessage);
    }
}