import { ValidationException } from "./ValidationException";
import { ObjectMap } from "../types/ObjectMap";

export class InvalidArrayOptionHasException extends ValidationException
{
    constructor(map: ObjectMap)
    {
        super(`Invalid array property option "has".`, map, undefined);
    }
}