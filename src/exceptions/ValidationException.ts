export class ValidationException extends Error
{
    // public readonly map?: Array<string | number>; // soon

    constructor(name: string, description: string, public readonly value: any)
    {
        super(`ValidationException.${name}: ${description}`);
    }
}