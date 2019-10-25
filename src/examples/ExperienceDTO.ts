import { BaseDTO } from "../entities";
import { Model, Property } from "../decorators";

@Model
export class ExperienceDTO extends BaseDTO<ExperienceDTO>
{
    @Property({type: "number", as: "integer", enum: [1, 2, 3, 4, 5]})
    public level: number;

    @Property({type: "string", min: 2, max: 64})
    public skill: string;
}