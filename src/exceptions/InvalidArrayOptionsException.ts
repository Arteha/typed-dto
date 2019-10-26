import { ValidationException } from "./ValidationException";

export class InvalidArrayOptionsException extends ValidationException
{
    constructor()
    {
        super("InvalidArrayOptionsException", `Invalid array options.`, undefined);
    }
}