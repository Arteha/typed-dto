import { ValidationException } from "./ValidationException";

export class MinNumberException extends ValidationException
{
    constructor(public readonly min: number, value: number)
    {
        super("MinNumberException", `Number less than: ${min}.`, value);
    }
}