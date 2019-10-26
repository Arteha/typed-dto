import { ValidationException } from "./ValidationException";

export class NotANumberException extends ValidationException
{
    constructor(value: any)
    {
        super("NotANumberException", `Value is not a number.`, value);
    }
}