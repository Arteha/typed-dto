import { BaseDTO } from "..";
import { Model, Property } from "../decorators";
import { ValidString, ValidNumber } from "../entities";

@Model
export class PersonDTO extends BaseDTO
{
    @Property([ValidString, {enum: ["male", "female"]}])
    public sex: "male" | "female";

    @Property([ValidString])
    public firstName: string;

    @Property([ValidString])
    public lastName: string;

    @Property([
        [ValidString, {allow: "0123456789"}],
        [ValidNumber, {type: "real"}]
    ])
    public age: string | number;
}


const person = new PersonDTO({
    sex: "male",
    firstName: "Golub",
    lastName: "Igor",
    age: 1
});