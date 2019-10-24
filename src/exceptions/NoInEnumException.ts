import { ValidationException } from "./ValidationException";

export class NoInEnumException extends ValidationException
{
    constructor(public readonly _enum: Array<string | number>, value: any)
    {
        super("NoInEnumException", `Value is not in: ${_enum.join(', ')}.`, value);
    }
}