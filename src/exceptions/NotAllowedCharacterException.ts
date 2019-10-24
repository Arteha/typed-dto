import { ValidationException } from "./ValidationException";

export class NotAllowedCharacterException extends ValidationException
{
    constructor(public readonly allowed: string, value: any)
    {
        super("NotAllowedCharacterException", `Allowed are: "${allowed}".`, value);
    }
}