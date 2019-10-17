import { ValidationException } from "./ValidationException";

export class NotFitToRegExpException extends ValidationException
{
    constructor(public readonly regExp: RegExp, value: string)
    {
        super("NotFitToRegExpException", `Value is not fit to RegExp: ${regExp.toString()}`, value);
    }
}