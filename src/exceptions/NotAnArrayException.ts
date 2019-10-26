import { ValidationException } from "./ValidationException";

export class NotAnArrayException extends ValidationException
{
    constructor(value: any)
    {
        super("NotAnArrayException", `Value is not an Array.`, value);
    }
}