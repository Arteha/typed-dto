import { ArrayOptions } from "../types";
import { NotAnArrayException } from "../exceptions/NotAnArrayException";
import { ValidationException } from "../exceptions/ValidationException";
import { validateValue } from "../utils/validateValue";
import { InvalidArrayOptionsException } from "../exceptions/InvalidArrayOptionsException";

export function ValidArray<T>(array: any, opts: ArrayOptions): Array<T>
{
    if (array instanceof Array)
    {
        if (opts.has instanceof Array)
        {
            if(opts.has.length == 0)
                throw new InvalidArrayOptionsException();

            for (let i = 0; i < array.length; i++)
            {
                let validationException: ValidationException | null = null;
                for(let options of opts.has)
                {
                    try
                    {
                        array[i] = validateValue(array[i], options);
                        validationException = null;
                        break;
                    }
                    catch (e)
                    {
                        validationException = e;
                    }
                }

                if(validationException)
                    throw validationException;
            }
        }
        else
        {
            for (let i = 0; i < array.length; i++)
                array[i] = validateValue(array[i], opts.has);
        }

        return array;
    }
    else
        throw new NotAnArrayException(array);
}