import { ObjectMap } from "../types/ObjectMap";

export class ValidationException extends Error
{
    public map: ObjectMap;

    constructor(public readonly name: string,
                public description: string,
                map: ObjectMap,
                public readonly value: any,
                public ufMessage?: string)
    {
        super();

        this.map = [...map];
    }

    public get message()
    {
        return `ValidationException.${this.name}${
            this.map.length ? ` "${this.map.join(">")}"` : ""
        }: ${this.description}`;
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