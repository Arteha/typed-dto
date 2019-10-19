import { ValidationException } from "./ValidationException";

export class HasForbiddenCharacterException extends ValidationException
{
    constructor(public readonly forbidden: string, value: any)
    {
        super("HasForbiddenCharacterException", `Forbidden are: "${forbidden}".`, value);
    }
}