import { PersonDTO } from "./dto/PersonDTO";
import { AsAttributes } from "../../lib/types";

const attrs: AsAttributes<PersonDTO> = {
    sex: "male",
    firstName: "Foo",
    lastName: "Bar",
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
    ],
    registeredAt: new Date(),
    notes: "..."
};
const json = JSON.stringify(attrs);
const person = new PersonDTO(json);

console.log(person);