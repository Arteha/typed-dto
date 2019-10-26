import { ValidationException } from "./ValidationException";

export class RequiredPropertyException extends ValidationException
{
    constructor(public readonly property: string, value: any)
    {
        super("RequiredPropertyException", `Property "${property}" is required.`, value);
    }
}