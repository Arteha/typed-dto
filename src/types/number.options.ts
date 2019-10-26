export type NumberOptions = {
    strict?: boolean
    as?: "integer" | "real"
    enum?: Array<number>
    ranges?: Array<[number, number]>
    min?: number
    max?: number
}