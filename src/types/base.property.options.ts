import { ValidationException } from "../exceptions/ValidationException";

export interface BasePropertyOptions
{
    error?: (e: ValidationException) => any
}