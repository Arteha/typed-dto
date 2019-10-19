import { BaseDTO } from "..";
import { Property } from "../decorators";
import { Model } from "../decorators";
import { ValidString } from "../entities/ValidString";
import { ValidNumber } from "../entities/ValidNumber";

@Model()
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


const person = PersonDTO.create({
    sex: "male",
    firstName: "Golub",
    lastName: "Igor",
    age: 1
});