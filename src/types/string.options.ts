export type StringEnumType = Array<string>;

export type StringOptions = {
    enum?: StringEnumType
    forbid?: string
    allow?: string
    regexp?: RegExp
    min?: number
    max?: number
}