import { StringOptions } from "../types";
import { NotAStringException } from "../exceptions/NotAStringException";
import { NoInEnumException } from "../exceptions/NoInEnumException";
import { NotFitToRegExpException } from "../exceptions/NotFitToRegExpException";
import { NotAllowedCharacterException } from "../exceptions/NotAllowedCharacterException";
import { HasForbiddenCharacterException } from "../exceptions/HasForbiddenCharacterException";

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

        // check allowed
        if(opts.allow)
        {
            for(let i = 0; i < value.length; i++)
                if(!opts.allow.includes(value[i]))
                    throw new NotAllowedCharacterException(opts.allow, value);
        }

        // check allowed
        if(opts.forbid)
        {
            for(let i = 0; i < value.length; i++)
                if(opts.forbid.includes(value[i]))
                    throw new HasForbiddenCharacterException(opts.forbid, value);
        }

        // RegExp test
        if(opts.regexp && !opts.regexp.test(value))
            throw new NotFitToRegExpException(opts.regexp, value);
    }

    return value;
}