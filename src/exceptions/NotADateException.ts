import { ValidationException } from "./ValidationException";

export class NotADateException extends ValidationException
{
    constructor(value: any)
    {
        super("NotADateException", `Value is not a Date.`, value);
    }
}