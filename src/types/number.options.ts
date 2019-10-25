export type NumberEnumType = Array<number>;

export type NumberOptions = {
    strict?: boolean
    as: "integer" | "real"
    enum?: NumberEnumType
    ranges?: Array<[number, number]>
    min?: number
    max?: number
}