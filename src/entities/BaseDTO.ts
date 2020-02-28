import { AsAttributes, ObjectType, PropertyMeta } from "../types";
import { ObjectMap } from "../types/ObjectMap";
import { parseJSON } from "../utils/parseJSON";
import { REQUIRED_PROPERTIES_SYMBOL as RP_SYMBOL } from "../symbols/REQUIRED_PROPERTIES_SYMBOL";
import { RequiredPropertyException } from "../exceptions/RequiredPropertyException";
import { SCHEMA_SYMBOL } from "../symbols/SCHEMA_SYMBOL";
import { ValidationException } from "../exceptions";
import { setProperty } from "../utils/setProperty";
import { UnexpectedPropertyException } from "../exceptions/UnexpectedPropertyException";
import { SCHEMA_OPTIONS_SYMBOL } from "../symbols/SCHEMA_OPTIONS_SYMBOL";
import { SchemaMeta } from "../types/schema.meta";
import { PROPERTIES_SYMBOL } from "../symbols/PROPERTIES_SYMBOL";
// import { ExceptionsCollection } from "../exceptions";

type PossibleSchemaMeta = PropertyMeta | undefined;

export class BaseDTO<A extends Object = any>
{
    constructor(props: AsAttributes<A> | string)
    {
        Reflect.defineMetadata(PROPERTIES_SYMBOL, props, this);
    }

    private validateAndSet(): this
    {
        const map: ObjectMap = [];

        const options: SchemaMeta | undefined = Reflect.getMetadata(SCHEMA_OPTIONS_SYMBOL, this);
        if(!options)
            throw new Error(`Looks like you DTO model "${this.constructor.name}" hasn't @Schema(...) decorator.`);

        const metaProps: Object | string | undefined = Reflect.getMetadata(PROPERTIES_SYMBOL, this);

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
        return this;
    }

    public static createOrFail<T extends BaseDTO>(this: ObjectType<T>, props: AsAttributes<T> | string): T
    {
        const instance: T = new (this as any)(props);
        return instance.validateAndSet();
    }

    public static create<T extends BaseDTO>(
        this: ObjectType<T>, props: AsAttributes<T> | string /*, exceptionsCollection?: ExceptionsCollection*/
    ): T | null
    {
        try
        {
            // TODO: attach exceptionsCollection as metadata to a model
            return (this as any).createOrFail(props);
        }
        catch(e)
        {
            return null;
        }
    }
}