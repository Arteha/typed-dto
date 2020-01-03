import { ArrayOptions } from "../types";
import { NotAnArrayException } from "../exceptions/NotAnArrayException";
import { ValidationException } from "../exceptions";
import { InvalidArrayOptionHasException } from "../exceptions/InvalidArrayOptionHasException";
import { ObjectMap } from "../types/ObjectMap";
import { setProperty } from "../utils/setProperty";
import { ArrayLengthException } from "../exceptions/ArrayLengthException";
import { ArrayMinLengthException } from "../exceptions/ArrayMinLengthException";
import { ArrayMaxLengthException } from "../exceptions/ArrayMaxLengthException";

export function ValidArray<T>(map: ObjectMap, array: any, opts: ArrayOptions): Array<T>
{
    if (array instanceof Array)
    {
        if(opts.length != null && array.length != opts.length)
            throw new ArrayLengthException(opts.length, map, array);
        if(opts.minLength != null && array.length < opts.minLength)
            throw new ArrayMinLengthException(opts.minLength, map, array);
        if(opts.maxLength != null && array.length > opts.maxLength)
            throw new ArrayMaxLengthException(opts.maxLength, map, array);

        if (opts.has instanceof Array)
        {
            if(opts.has.length == 0)
                throw new InvalidArrayOptionHasException(map);

            for (let i = 0; i < array.length; i++)
            {
                let validationException: ValidationException | null = null;
                for(let options of opts.has)
                {
                    validationException = setProperty(map, array, options, i, array[i]);
                    if(!validationException)
                        break;
                }

                if(validationException)
                    throw validationException;
            }
        }
        else
        {
            for (let i = 0; i < array.length; i++)
            {
                const validationException = setProperty(map, array, opts.has, i, array[i]);
                if(validationException)
                    throw validationException;
            }
        }

        return array;
    }
    else
        throw new NotAnArrayException(map, array);
}