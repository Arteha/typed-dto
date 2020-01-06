import { ValidationException } from "./ValidationException";

export class ExceptionsCollection extends Array<ValidationException>
{
    public add(exceptions: ValidationException | Array<ValidationException>)
    {
        if(exceptions instanceof Array)
            this.push(...exceptions);
        else
            this.push(exceptions);
    }
}