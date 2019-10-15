import { ValidationException } from "./ValidationException";

export class NoSuchPropertyException extends ValidationException
{
    constructor(propertyName: string)
    {
        super("NoSuchPropertyException", `Property "${propertyName}" does not exist.`);
    }
}