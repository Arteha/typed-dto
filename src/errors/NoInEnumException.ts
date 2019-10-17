import { ValidationException } from "./ValidationException";
import { Enumerable } from "../types";

export class NoInEnumException extends ValidationException
{
    constructor(public readonly _enum: Array<Enumerable>, value: any)
    {
        super("NoInEnumException", `Value is not in: ${_enum.join(', ')}.`, value);
    }
}