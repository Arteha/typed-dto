import { ObjectMap } from "../types/ObjectMap";

export class ValidationException extends Error
{
    constructor(name: string,
                public readonly description: string,
                public readonly map: ObjectMap,
                public readonly value: any,
                public readonly ufMessage?: string)
    {
        super(`ValidationException.${name}${map.length ? ` "${map.join(">")}"` : ""}: ${description}`);
    }

    public get stack(): string
    {
        return super.stack || "";
    }

    public toSring()
    {
        return this.ufMessage != null ? this.ufMessage : this.description;
    }
}