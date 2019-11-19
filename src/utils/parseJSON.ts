import { ObjectMap } from "../types/ObjectMap";
import { JSONParseException } from "../exceptions/JSONParseException";

export function parseJSON(json: string, map: ObjectMap)
{
    try
    { return JSON.parse(json) }
    catch (e)
    { throw new JSONParseException(e.message, map, json) }
}