import { BaseDTO } from "..";
import { TypedDTO, Property } from "../decorators";
import { ExperienceDTO } from "./ExperienceDTO";

@TypedDTO
export class PersonDTO extends BaseDTO<PersonDTO>
{
    @Property({ type: "string", enum: [ "male", "female" ] })
    public sex: "male" | "female";

    @Property({ type: "string" })
    public firstName: string;

    @Property({ type: "string" })
    public lastName: string;

    @Property([
        { type: "number", as: "real" },
        { type: "string", allow: "0123456789" }
    ])
    public age: string | number;

    @Property({
        type: "array",
        contains: [{ type: ExperienceDTO }]
    })
    public experiences: Array<ExperienceDTO>;

    @Property({ type: "string" }, true)
    public notes?: string;
}

const person = new PersonDTO({
    sex: "male",
    firstName: "Golub",
    lastName: "Igor",
    age: 21,
    experiences: [
        {
            level: 4,
            skill: "codding"
        },
        {
            level: 1,
            skill: "photoshop"
        }
    ]
});

console.log(person);