import { ValidationException } from "./ValidationException";

export class NoSuchPropertyException extends ValidationException
{
    constructor(public readonly propertyName: string)
    {
        super("NoSuchPropertyException", `Property "${propertyName}" does not exist.`, undefined);
    }
}