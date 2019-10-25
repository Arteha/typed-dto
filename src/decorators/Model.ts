import { BaseDTO} from "../";
import { NoSuchPropertyException } from "../exceptions/NoSuchPropertyException";
import { JSONParseException } from "../exceptions/JSONParseException";
import { ValidationException } from "../exceptions/ValidationException";
import { setProperty } from "../utils/setProperty";
import { PROPERTIES_SYMBOL } from "../symbols/PROPERTIES_SYMBOL";
import { SCHEMA_SYMBOL } from "../symbols/SCHEMA_SYMBOL";
import { Schema } from "../types/Schema";

function parseJSON(json: string)
{
    try
    { return JSON.parse(json) }
    catch (e)
    { throw new JSONParseException(e.message, json) }
}

type PossibleModelMetaProps = Object | string | undefined;
export type PossibleSchemaMeta = Schema | undefined;

export function Model<T extends { new(...args: any[]): BaseDTO }>(original: T): T
{
    return class extends original
    {
        constructor(...args: any[])
        {
            super(...args);

            const metaProps: PossibleModelMetaProps = Reflect.getMetadata(PROPERTIES_SYMBOL, this,  PROPERTIES_SYMBOL);
            const props: Object | null | undefined = typeof metaProps == "string" ? parseJSON(metaProps) : metaProps;
            if (props)
            {
                for (const p in props)
                {
                    const value = props[ p ];
                    const schema: PossibleSchemaMeta = Reflect.getMetadata(SCHEMA_SYMBOL, this, p);
                    if (schema)
                    {
                        let validationException: ValidationException | null = null;
                        if(value === undefined && schema.optional)
                        {
                            this[p] = value;
                            continue;
                        }

                        if(schema.options instanceof Array)
                        {
                            for(const options of schema.options)
                            {
                                validationException = setProperty(this, p, value, options);
                                if(!validationException)
                                    break;
                            }
                        }
                        else
                            validationException = setProperty(this, p, value, schema.options);

                        if(validationException)
                            throw validationException;
                    }
                    else
                        throw new NoSuchPropertyException(p);
                }
                Reflect.deleteMetadata(PROPERTIES_SYMBOL, this, PROPERTIES_SYMBOL)
            }
        }
    } as any;
}