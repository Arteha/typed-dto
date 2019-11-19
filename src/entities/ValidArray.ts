import { ArrayOptions } from "../types";
import { NotAnArrayException } from "../exceptions/NotAnArrayException";
import { ValidationException } from "../exceptions/ValidationException";
import { InvalidArrayOptionHasException } from "../exceptions/InvalidArrayOptionHasException";
import { ObjectMap } from "../types/ObjectMap";
import { setProperty } from "../utils/setProperty";

export function ValidArray<T>(map: ObjectMap, array: any, opts: ArrayOptions): Array<T>
{
    console.log(map);
    if (array instanceof Array)
    {
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