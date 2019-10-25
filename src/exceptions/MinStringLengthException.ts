import { ValidationException } from "./ValidationException";

export class MinStringLengthException extends ValidationException
{
    constructor(public readonly min: number, value: any)
    {
        super("MinStringLengthException", `String length less than: ${min}.`, value);
    }
}