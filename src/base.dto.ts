import { AsAttributes, ObjectType } from "./types";
import { schemaSymbol } from "./decorators/Property";

export class BaseDTO
{
    constructor(props: Object)
    {
        for (const p in props)
        {
            const prop = props[p];
            const meta = Reflect.getMetadata(schemaSymbol, this, p);
        }
    }

    public static buildOrFail<T extends BaseDTO>(this: ObjectType<T>, attributes: AsAttributes<T>): T
    {
        return new (this as any)(attributes);
    }

    public static build<T extends BaseDTO>(this: ObjectType<T>, attributes: AsAttributes<T>): T | null
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