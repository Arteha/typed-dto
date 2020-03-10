import { ObjectMap } from "../types/ObjectMap";

export class ValidationException extends Error
{
    public map: ObjectMap;

    constructor(public readonly description: string,
                map: ObjectMap,
                public readonly value: any,
                ufMessage?: string)
    {
        super(ufMessage != null ? ufMessage : description);

        this.map = [...map];
    }

    public get message()
    {
        console.log("message");
        return `${this.map.length ? ` "${this.map.join(">")}" ` : ""}${this.description}`;
    }

    public get stack(): string
    {
        console.log("stack");
        return super.stack || "";
    }

    public toString()
    {
        console.log("tostring");
        return `${this.map.length ? ` "${this.map.join(">")}" ` : ""}${this.description}`;
    }
}