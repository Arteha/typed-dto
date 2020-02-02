import { BaseDTO, Property, Schema } from "../../../src";
import { ExperienceDTO } from "./ExperienceDTO";

@Schema({ strict: false })
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
        has: [{ type: ExperienceDTO }]
    })
    public experiences: Array<ExperienceDTO>;

    @Property({type: "date"})
    public registeredAt: Date;

    @Property({type: "boolean"}, true)
    public sick?: boolean;

    @Property({ type: "string" }, true)
    public notes?: string;
}