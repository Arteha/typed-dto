import { ObjectMap } from "../types/ObjectMap";

export class ValidationException extends Error
{
    public map: ObjectMap;
    constructor(name: string,
                public description: string,
                map: ObjectMap,
                public readonly value: any,
                public ufMessage?: string)
    {
        super(`ValidationException.${name}${map.length ? ` "${map.join(">")}"` : ""}: ${description}`);

        this.map = [...map];
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