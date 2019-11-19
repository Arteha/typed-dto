import { AsAttributes } from "../types";
import { PROPERTIES_SYMBOL } from "../symbols/PROPERTIES_SYMBOL";

export class BaseDTO<A extends Object = any>
{
    constructor(props: AsAttributes<A> | string)
    {
        Reflect.defineMetadata(PROPERTIES_SYMBOL, props, this);
    }

    public static createOrFail<T extends BaseDTO>(attributes: AsAttributes<T>): T
    {
        return new (this as any)(attributes);
    }

    public static create<T extends BaseDTO>(attributes: AsAttributes<T>): T | null
    {
        try
        {
            const instance = new (this as any)(attributes);
            return (this as any).validate(instance);
        }
        catch(e)
        {
            return null;
        }
    }
}