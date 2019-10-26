import { ValidationException } from "./ValidationException";

export class MaxNumberException extends ValidationException
{
    constructor(public readonly max: number, value: number)
    {
        super("MaxNumberException", `Number more than: ${max}.`, value);
    }
}