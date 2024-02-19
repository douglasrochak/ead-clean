import Validator from "./Validator"

export default class SimpleText {
  constructor(
    readonly complete: string,
    min: number,
    max: number,
    attribute?: string,
    object?: string ,
  ) {
    this.complete = complete?.trim()
    Validator.value(complete, attribute, object)
      .notEmpty()
      .sizeGreaterThanOrEqual(min)
      .sizeLessThanOrEqual(max)
      .throwIfError()
  }

}
