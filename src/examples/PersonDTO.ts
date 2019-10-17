import { BaseDTO } from "..";
import { Property } from "../decorators";
import { Model } from "../decorators";

@Model
export class PersonDTO extends BaseDTO
{
    @Property({ enum: ["male", "female"] })
    public sex: "male" | "female";

    @Property({type: "string"})
    public firstName: string;

    @Property({type: "string"})
    public lastName: string;
}


const person = PersonDTO.create({
    sex: "male",
    firstName: "Golub",
    lastName: "Igor"
});