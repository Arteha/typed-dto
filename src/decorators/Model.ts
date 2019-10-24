import { BaseDTO, PropertyOptions, schemaSymbol } from "../";
import { NoSuchPropertyException } from "../exceptions/NoSuchPropertyException";
import { JSONParseException } from "../exceptions/JSONParseException";
import { ValidArray, ValidBoolean, ValidDate, ValidNull, ValidNumber, ValidString, ValidUndefined } from "../entities";
import { ValidationException } from "../exceptions/ValidationException";

function parseJSON(json: string)
{
    try
    { return JSON.parse(json) }
    catch (e)
    { throw new JSONParseException(e.message, json) }
}

type PossibleMeta = Array<PropertyOptions> | PropertyOptions | undefined;

function setProperty(instance: Object, p: string, value: any, meta: PropertyOptions): ValidationException | null
{
    try
    {
        if (meta.type == "array")
            instance[ p ] = ValidArray(value, meta.opts);
        else if (meta.type == "boolean")
            instance[ p ] = ValidBoolean(value, meta.opts);
        else if (meta.type == "date")
            instance[ p ] = ValidDate(value, meta.opts);
        else if (meta.type == "null")
            instance[ p ] = ValidNull(value, meta.opts);
        else if (meta.type == "number")
            instance[ p ] = ValidNumber(value, meta.opts);
        else if (meta.type == "string")
            instance[ p ] = ValidString(value, meta.opts);
        else // meta.type == "undefined"
            instance[ p ] = ValidUndefined(value, meta.opts);

        return null;
    }
    catch (e)
    {
        return e;
    }
}

export function Model<T extends { new(...args: any[]): BaseDTO }>(original: T): T
{
    return class extends original
    {
        constructor(...args: any[])
        {
            super(...args);

            const props = typeof this._props == "string" ? parseJSON(this._props) : this._props;
            if (props)
            {
                for (const p in props)
                {
                    const value = props[ p ];
                    const meta: PossibleMeta = Reflect.getMetadata(schemaSymbol, this, p);
                    if (meta)
                    {
                        let validationException: ValidationException | null = null;
                        if(meta instanceof Array)
                        {
                            for(const m of meta)
                            {
                                validationException = setProperty(this, p, value, m);
                                if(!validationException)
                                    break;
                            }
                        }
                        else
                            validationException = setProperty(this, p, value, meta);

                        if(validationException)
                            throw validationException;
                    }
                    else
                        throw new NoSuchPropertyException(p);
                }
            }
            delete this._props;
        }
    } as any;
}