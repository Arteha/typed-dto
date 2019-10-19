import { ValidationException } from "./ValidationException";

export class NotAStringException extends ValidationException
{
    constructor(value: any)
    {
        super("NotAStringException", `Value is not type of "string".`, value);
    }
}