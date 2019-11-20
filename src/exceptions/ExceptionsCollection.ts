import { TypedDTOException } from "./TypedDTOException";
import { ValidationException } from "./ValidationException";

export class ExceptionsCollection extends TypedDTOException
{
    constructor(public exceptions: Array<ValidationException>)
    {
        super();
    }

    public add(exceptions: ValidationException | Array<ValidationException>)
    {
        if(exceptions instanceof Array)
            this.exceptions = this.exceptions.concat(exceptions);
        else
            this.exceptions.push(exceptions);
    }
}