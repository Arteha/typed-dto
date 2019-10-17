import { StringOptions } from "../types";
import { NotAStringException } from "../errors/NotAStringException";
import { NoInEnumException } from "../errors/NoInEnumException";
import { NotFitToRegExpException } from "../errors/NotFitToRegExpException";

export function ValidString(value: any, opts?: StringOptions)
{
    // check if string
    if(typeof value != "string")
        throw new NotAStringException(value);

    if(opts)
    {
        // check in enum
        if(opts.enum && !opts.enum.includes(value))
            throw new NoInEnumException(opts.enum, value);

        // RegExp test
        if(opts.regexp && !opts.regexp.test(value))
            throw new NotFitToRegExpException(opts.regexp, value);
    }

    return value;
}