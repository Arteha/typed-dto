import { ValidationException } from "./ValidationException";

export class NotABooleanException extends ValidationException
{
    constructor(value: any)
    {
        super("NotABooleanException", `Value is not type of "boolean".`, value);
    }
}