import { BaseDTO } from "..";
import { Model, Property } from "../decorators";

@Model
export class PersonDTO extends BaseDTO
{

    @Property({ type: "string", opts: { enum: [ "male", "female" ] } })
    public sex: "male" | "female";

    @Property({ type: "string" })
    public firstName: string;

    @Property({ type: "string" })
    public lastName: string;

    @Property([
        { type: "string", opts: { allow: "0123456789" } },
        { type: "number", opts: { type: "integer" } }
    ])
    public age: string | number;

    constructor(props: Object | string)
    {
        super(props);
    }
}

const person = new PersonDTO({
    sex: "male",
    firstName: "Golub",
    lastName: "Igor",
    age: 21
});

console.log(person);