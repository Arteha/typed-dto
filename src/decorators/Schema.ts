import { BaseDTO } from "../";
import { NoSuchPropertyException } from "../exceptions/NoSuchPropertyException";
import { JSONParseException } from "../exceptions/JSONParseException";
import { ValidationException } from "../exceptions/ValidationException";
import { setProperty } from "../utils/setProperty";
import { PROPERTIES_SYMBOL } from "../symbols/PROPERTIES_SYMBOL";
import { SCHEMA_SYMBOL } from "../symbols/SCHEMA_SYMBOL";
import { REQUIRED_PROPERTIES_SYMBOL as RP_SYMBOL } from "../symbols/REQUIRED_PROPERTIES_SYMBOL";
import { RequiredPropertyException } from "../exceptions/RequiredPropertyException";
import { SchemaMeta } from "../types";

function parseJSON(json: string)
{
    try
    { return JSON.parse(json) }
    catch (e)
    { throw new JSONParseException(e.message, json) }
}

type PossibleModelMetaProps = Object | string | undefined;
export type PossibleSchemaMeta = SchemaMeta | undefined;

export function Schema<T extends { new(...args: any[]): BaseDTO }>(original: T): T
{
    return class extends original
    {
        constructor(...args: any[])
        {
            super(...args);

            const metaProps: PossibleModelMetaProps = Reflect.getMetadata(PROPERTIES_SYMBOL, this);
            Reflect.deleteMetadata(PROPERTIES_SYMBOL, this);

            const props: Object | null | undefined = typeof metaProps == "string" ? parseJSON(metaProps) : metaProps;

            if (props)
            {
                const required: Record<string, boolean> | undefined = Reflect.getMetadata(RP_SYMBOL, this);
                Reflect.deleteMetadata(RP_SYMBOL, this);

                if (required)
                {
                    for (let r in required)
                    {
                        if (required[ r ] && !props.hasOwnProperty(r))
                            throw new RequiredPropertyException(r, undefined);
                    }
                }

                for (const p in props)
                {
                    const value = props[ p ];
                    const schema: PossibleSchemaMeta = Reflect.getMetadata(SCHEMA_SYMBOL, this, p);
                    if (schema)
                    {
                        let validationException: ValidationException | null = null;
                        if (value === undefined && schema.optional)
                        {
                            this[ p ] = value;
                            continue;
                        }

                        if (schema.options instanceof Array)
                        {
                            for (const options of schema.options)
                            {
                                validationException = setProperty(this, p, value, options);
                                if (!validationException)
                                    break;
                            }
                        }
                        else
                            validationException = setProperty(this, p, value, schema.options);

                        if (validationException)
                            throw validationException;
                    }
                    else
                        throw new NoSuchPropertyException(p);
                }
            }
        }
    } as any;
}