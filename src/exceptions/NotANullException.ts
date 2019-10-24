import { ValidationException } from "./ValidationException";

export class NotANullException extends ValidationException
{
    constructor(value: any)
    {
        super("NotANullException", `Value is not type of "null".`, value);
    }
}