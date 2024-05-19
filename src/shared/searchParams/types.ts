export type Keys = keyof Schema
export type PartialSchema = Partial<Schema>
export interface Schema {
  // lat: number
  // lon: number

  testNum: number
  testStr: string
  testBool: boolean
  testNull: null
  testUndefined: undefined
  testObj: {
    num: number
    str: string
    bool: boolean
    null: null
    undefined: undefined
  }
  testArr: Schema['testObj'][]
}

export type Serializer = (value: Schema[Keys]) => string
export type Deserializer = <T extends Keys>(value: string) => Schema[T]
export type ParamsModifier = (current: URLSearchParams) => void

export interface UseParamsOptions {
  serializer?: Serializer
  deserializer?: Deserializer
}

export interface ParamsModifierOptions {
  replace?: boolean
}

export type Entrie<T extends Keys> = T extends T ? [T, Schema[T]] : never
export type ForEachFnArgs<T extends Keys> = T extends T
  ? [value: Schema[T], key: T]
  : never
