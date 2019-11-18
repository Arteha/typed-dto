import { AsAttributes, ObjectType, SchemaMeta } from "../types";
import { PROPERTIES_SYMBOL } from "../symbols/PROPERTIES_SYMBOL";
import { REQUIRED_PROPERTIES_SYMBOL as RP_SYMBOL } from "../symbols/REQUIRED_PROPERTIES_SYMBOL";
import { RequiredPropertyException } from "../exceptions/RequiredPropertyException";
import { SCHEMA_SYMBOL } from "../symbols/SCHEMA_SYMBOL";
import { ValidationException } from "../exceptions/ValidationException";
import { setProperty } from "../utils/setProperty";
import { NoSuchPropertyException } from "../exceptions/NoSuchPropertyException";
import { ObjectMap } from "../types/ObjectMap";
import { MAP_SYMBOL } from "../symbols/MAP_SYMBOL";
import { parseJSON } from "../utils/parseJSON";

type PossibleModelMetaProps = Object | string | undefined;
type PossibleSchemaMeta = SchemaMeta | undefined;

export class BaseDTO<A extends Object = any>
{
    constructor(props: AsAttributes<A> | string)
    {
        Reflect.defineMetadata(PROPERTIES_SYMBOL, props, this);
    }

    public static validate<T extends BaseDTO>(instance: T): T
    {
        let metaMap: ObjectMap | undefined = Reflect.getMetadata(MAP_SYMBOL, instance);
        if(!metaMap)
        {
            metaMap = [];
            Reflect.defineMetadata(MAP_SYMBOL, metaMap, instance);
        }

        const metaProps: PossibleModelMetaProps = Reflect.getMetadata(PROPERTIES_SYMBOL, instance);
        Reflect.deleteMetadata(PROPERTIES_SYMBOL, instance);

        const props: Object | null | undefined = typeof metaProps == "string" ? parseJSON(metaProps, metaMap) : metaProps;

        if(props)
        {
            const required: Record<string, boolean> | undefined = Reflect.getMetadata(RP_SYMBOL, instance);
            Reflect.deleteMetadata(RP_SYMBOL, instance);

            if(required)
            {
                for (let r in required)
                {
                    if(required[r] && !props.hasOwnProperty(r))
                        throw new RequiredPropertyException(r, metaMap, undefined);
                }
            }

            for (const p in props)
            {
                const value = props[p];
                const schema: PossibleSchemaMeta = Reflect.getMetadata(SCHEMA_SYMBOL, instance, p);
                if(schema)
                {
                    let validationException: ValidationException | null = null;
                    if(value === undefined && schema.optional)
                    {
                        instance[p] = value;
                        continue;
                    }

                    if(schema.options instanceof Array)
                    {
                        for (const options of schema.options)
                        {
                            validationException = setProperty(metaMap, instance, options, p, value);
                            if(!validationException)
                                break;
                        }
                    }
                    else
                        validationException = setProperty(metaMap, instance, schema.options, p, value);

                    if(validationException)
                        throw validationException;
                }
                else
                    throw new NoSuchPropertyException(p, metaMap);
            }
        }

        return instance;
    };

    public static createOrFail<T extends BaseDTO>(attributes: AsAttributes<T>): T
    {
        // TODO: fix
        const instance = new this(attributes);
        return this.validate(instance);
    }

    public static create<T extends BaseDTO>(attributes: AsAttributes<T>): T | null
    {
        try
        {
            const instance = new (this as any)(attributes);
            return (this as any).validate(instance);
        }
        catch(e)
        {
            return null;
        }
    }
}