import { BaseDTO } from "../src";
import { Property } from "../src/decorators";

export class PersonDTO extends BaseDTO
{
    @Property({ enum: ["male", "felame"]})
    public sex: "male" | "felame";

    @Property({type: "string"})
    public firstName: string;

    @Property({type: "string"})
    public lastName: string;
}


const person = PersonDTO.build({
    sex: "male",
    firstName: "Golub",
    lastName: "Igor"
});