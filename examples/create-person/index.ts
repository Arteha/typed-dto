import { PersonDTO } from "./dto/PersonDTO";
import { AsAttributes } from "../../src/types";

const attrs: AsAttributes<any> = {
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
            level: 2,
            skill: "photoshop"
        }
    ],
    registeredAt: new Date(),
    notes: "some notes",
    doesNotOccurErrorWhenSchemaIsNotStrict: "test string"
};
const json = JSON.stringify(attrs);
const person = PersonDTO.create(json);

console.log(person);