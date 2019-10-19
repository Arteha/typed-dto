import { AsAttributes, ObjectType } from "../types";

export class BaseDTO
{
    // public _props: Object | undefined;
    constructor(props: Object)
    {
        // this._props = props;
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