import { ValidationException } from "./ValidationException";

export class NotInRangeException extends ValidationException
{
    constructor(public readonly ranges: Array<[number, number]>, value: number)
    {
        super("NotInRangeException", `Number is not in ranges: ${JSON.stringify(ranges)}.`, value);
    }
}