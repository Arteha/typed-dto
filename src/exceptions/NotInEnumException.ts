import { ValidationException } from "./ValidationException";

export class NotInEnumException extends ValidationException
{
    constructor(public readonly _enum: Array<string | number>, value: any)
    {
        super("NotInEnumException", `Value is not in: ${_enum.join(", ")}.`, value);
    }
}