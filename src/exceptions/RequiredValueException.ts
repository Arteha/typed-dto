import { ValidationException } from "./ValidationException";

export class RequiredValueException extends ValidationException
{
    constructor(value: any)
    {
        super("RequiredValueException", `Value required but received undefined.`, value);
    }
}