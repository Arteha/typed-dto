import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class InvalidArrayOptionHasException extends ValidationException
{
    constructor(map: ObjectMap)
    {
        super("InvalidArrayOptionHasException", `Invalid array property option "has".`, map, undefined);
    }
}