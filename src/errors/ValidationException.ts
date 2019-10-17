export class ValidationException extends Error
{
    constructor(name: string, description: string, public readonly value: any)
    {
        super(`ValidationException.${name}: ${description}`);
    }
}