import { BaseDTO, SchemaMeta } from "../";
import { ObjectMap } from "../types/ObjectMap";
import { PROPERTIES_SYMBOL } from "../symbols/PROPERTIES_SYMBOL";
import { parseJSON } from "../utils/parseJSON";
import { REQUIRED_PROPERTIES_SYMBOL as RP_SYMBOL } from "../symbols/REQUIRED_PROPERTIES_SYMBOL";
import { RequiredPropertyException } from "../exceptions/RequiredPropertyException";
import { SCHEMA_SYMBOL } from "../symbols/SCHEMA_SYMBOL";
import { ValidationException } from "../exceptions";
import { setProperty } from "../utils/setProperty";
import { UnexpectedPropertyException } from "../exceptions/UnexpectedPropertyException";
import { SchemaOptions } from "../types/schema.options";

type PossibleModelMetaProps = Object | string | undefined;
type PossibleSchemaMeta = SchemaMeta | undefined;

export function Schema<T extends { new(...args: any[]): BaseDTO }>(options: SchemaOptions = {}): Function
{
    return function (original: T): T
    {
        return class extends original
        {
            constructor(...args: any[])
            {
                super(...args);

                const map: ObjectMap = [];

                const metaProps: PossibleModelMetaProps = Reflect.getMetadata(PROPERTIES_SYMBOL, this);
                Reflect.deleteMetadata(PROPERTIES_SYMBOL, this);

                const props: Object | null | undefined = typeof metaProps == "string" ? parseJSON(
                    metaProps, map
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
                                throw new RequiredPropertyException(r, map, undefined);
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
                                    validationException = setProperty(map, this, options, p, value);
                                    if (!validationException)
                                        break;
                                }
                            }
                            else
                                validationException = setProperty(map, this, schema.options, p, value);

                            if (validationException)
                                throw validationException;
                        }
                        else if (options.strict)
                            throw new UnexpectedPropertyException(p, map);
                        else
                            this[ p ] = value;
                    }
                }
            }
        } as any;
    }
}