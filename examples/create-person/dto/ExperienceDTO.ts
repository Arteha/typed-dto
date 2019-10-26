import { BaseDTO, Schema, Property } from "../../../lib";

@Schema
export class ExperienceDTO extends BaseDTO
{
    @Property({type: "number", as: "integer", enum: [1, 2, 3, 4, 5]})
    public level: 1 | 2 | 3 | 4 | 5;

    @Property({type: "string", min: 2, max: 64})
    public skill: string;
}