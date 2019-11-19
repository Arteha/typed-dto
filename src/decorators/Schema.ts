import { BaseDTO, SchemaMeta } from "../";
import { ObjectMap } from "../types/ObjectMap";
import { MAP_SYMBOL } from "../symbols/MAP_SYMBOL";
import { PROPERTIES_SYMBOL } from "../symbols/PROPERTIES_SYMBOL";
import { parseJSON } from "../utils/parseJSON";
import { REQUIRED_PROPERTIES_SYMBOL as RP_SYMBOL } from "../symbols/REQUIRED_PROPERTIES_SYMBOL";
import { RequiredPropertyException } from "../exceptions/RequiredPropertyException";
import { SCHEMA_SYMBOL } from "../symbols/SCHEMA_SYMBOL";
import { ValidationException } from "../exceptions/ValidationException";
import { setProperty } from "../utils/setProperty";
import { NoSuchPropertyException } from "../exceptions/NoSuchPropertyException";

type PossibleModelMetaProps = Object | string | undefined;
type PossibleSchemaMeta = SchemaMeta | undefined;

export function Schema<T extends { new(...args: any[]): BaseDTO }>(original: T): T
{
    return class extends original
    {
        constructor(...args: any[])
        {
            super(...args);

            let metaMap: ObjectMap | undefined = Reflect.getMetadata(MAP_SYMBOL, this);
            if (!metaMap)
            {
                metaMap = [];
                Reflect.defineMetadata(MAP_SYMBOL, metaMap, this);
            }

            const metaProps: PossibleModelMetaProps = Reflect.getMetadata(PROPERTIES_SYMBOL, this);
            Reflect.deleteMetadata(PROPERTIES_SYMBOL, this);

            const props: Object | null | undefined = typeof metaProps == "string" ? parseJSON(
                metaProps, metaMap
            ) : metaProps;

            if (props)
            {
                const required: Record<string, boolean> | undefined = Reflect.getMetadata(RP_SYMBOL, this);
                Reflect.deleteMetadata(RP_SYMBOL, this);

                if (required)
                {
                    for (let r in required)
                    {
                        if (required[ r ] && !props.hasOwnProperty(r))
                            throw new RequiredPropertyException(r, metaMap, undefined);
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
                                validationException = setProperty(metaMap, this, options, p, value);
                                if (!validationException)
                                    break;
                            }
                        }
                        else
                            validationException = setProperty(metaMap, this, schema.options, p, value);

                        if (validationException)
                            throw validationException;
                    }
                    else
                        throw new NoSuchPropertyException(p, metaMap);
                }
            }
        }
    } as any;
}