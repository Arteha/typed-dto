import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class HasForbiddenCharacterException extends ValidationException
{
    constructor(public readonly forbidden: string, map: ObjectMap, value: any, ufMessage?: string)
    {
        super("HasForbiddenCharacterException", `Forbidden are: "${forbidden}".`, map, value, ufMessage);
    }
}