import { ValidationException } from "./ValidationException";

export class NotAnIntegerException extends ValidationException
{
    constructor(value: number)
    {
        super("NotAnIntegerException", `Number is not an integer.`, value);
    }
}