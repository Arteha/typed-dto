import { AsAttributes, ObjectType } from "../types";
import { PROPERTIES_SYMBOL } from "../symbols/PROPERTIES_SYMBOL";

export class BaseDTO<A extends Object = any>
{
    constructor(props: AsAttributes<A> | string)
    {
        Reflect.defineMetadata(PROPERTIES_SYMBOL, props, this);
    }

    public static createOrFail<T extends BaseDTO>(this: ObjectType<T>, attributes: AsAttributes<T>): T
    {
        return new (this as any)(attributes);
    }

    public static create<T extends BaseDTO>(this: ObjectType<T>, attributes: AsAttributes<T>): T | null
    {
        try
        {
            return new (this as any)(attributes);
        }
        catch(e)
        {
            return null;
        }
    }
}