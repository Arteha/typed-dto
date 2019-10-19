import { BaseDTO } from "..";

export function Model<T extends { new(...args: any[]): BaseDTO }>(): Function
{

    /*for (const p in props)
    {
        if(this.hasOwnProperty(p))
        {
            const prop = props[p];
            const meta = Reflect.getMetadata(schemaSymbol, this, p);
        }
        else
            throw new NoSuchPropertyException(p);
    }*/

    return function (target: Function)
    {
        const kek = 1;
    }
}