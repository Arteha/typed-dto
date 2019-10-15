export class ValidationException extends Error
{
    constructor(name: string, description: string)
    {
        super(`ValidationException.${name}: ${description}`);
    }
}