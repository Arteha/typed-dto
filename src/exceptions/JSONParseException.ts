import { ValidationException } from "./ValidationException";

export class JSONParseException extends ValidationException
{
    constructor(message: string, value: string)
    {
        super("JSONParseException", message, value);
    }
}