import { ValidationException } from "./ValidationException";

export class NotAnUndefinedException extends ValidationException
{
    constructor(value: any)
    {
        super("NotAnUndefinedException", `Value is not type of "undefined".`, value);
    }
}