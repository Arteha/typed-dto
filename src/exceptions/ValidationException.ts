import { ObjectMap } from "../types/ObjectMap";

export class ValidationException extends Error
{
    public map: ObjectMap;

    constructor(public description: string,
                map: ObjectMap,
                public readonly value: any,
                private ufMessage?: string)
    {
        super(`${map.length ? ` "${map.join(">")}": ` : ""}${description}`);

        this.map = [...map];
    }

    public get message(): string
    {
        return this.ufMessage != null ? this.ufMessage : this.description;
    }

    public get stack(): string
    {
        return super.stack || "";
    }
}