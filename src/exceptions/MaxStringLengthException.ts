import { ValidationException } from "./ValidationException";

export class MaxStringLengthException extends ValidationException
{
    constructor(public readonly max: number, value: any)
    {
        super("MaxStringLengthException", `String length more than: ${max}.`, value);
    }
}