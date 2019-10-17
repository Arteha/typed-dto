import { AsAttributes, ObjectType } from "../types";
import { schemaSymbol } from "../decorators";
import { NoSuchPropertyException } from "../errors/NoSuchPropertyException";

export class BaseDTO
{
    constructor(props: Object)
    {
        for (const p in props)
        {
            if(this.hasOwnProperty(p))
            {
                const prop = props[p];
                const meta = Reflect.getMetadata(schemaSymbol, this, p);
            }
            else
                throw new NoSuchPropertyException(p);
        }
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