import { NullOptions, NumberOptions } from "../types";
import { NotANumberException } from "../exceptions/NotANumberException";
import { NotAnIntegerException } from "../exceptions/NotAnIntegerException";
import { NotInEnumException } from "../exceptions/NotInEnumException";
import { MaxNumberException } from "../exceptions/MaxNumberException";
import { MinNumberException } from "../exceptions/MinNumberException";
import { NotInRangeException } from "../exceptions/NotInRangeException";
import { ObjectMap } from "../types/ObjectMap";

export function ValidNumber(value: any, opts: NumberOptions, map: ObjectMap = []): number
{
    if(opts)
    {
        let number: number | null = null;
        if(opts.strict)
        {
            if(typeof value == "number")
                number = value;
        }
        else
        {
            number = Number(value);
            if(isNaN(number))
                number = null;
        }

        if(number != null)
        {
            if(opts.as == "integer")
            {
                const real = number;
                number = parseInt(number as any);
                if(real != number)
                    throw new NotAnIntegerException(map, number);
            }

            if(opts.min != null && number < opts.min)
                throw new MinNumberException(opts.min, map, number);

            if(opts.max != null && number > opts.max)
                throw new MaxNumberException(opts.max, map, number);

            if(opts.enum && !opts.enum.includes(number))
                throw new NotInEnumException(opts.enum, map, number);

            if(opts.ranges)
            {
                for(const range of opts.ranges)
                {
                    if(!(range[0] <= number && number <= range[1]))
                        throw new NotInRangeException(opts.ranges, map, number);
                }
            }

            return number;
        }
    }
    else
    {
        const number = parseFloat(value);
        if(!isNaN(number))
            return number;
    }

    throw new NotANumberException(map, value);
}