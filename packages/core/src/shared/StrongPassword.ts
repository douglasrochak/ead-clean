import Validator from "./Validator";

export default class StrongPassword {
  constructor(
    readonly value: string = "",
    attribute?: string,
    object?: string,
  ) {
    Validator.value(value, attribute, object)
    .strongPassword()
    .throwIfError()
  }

  static isValid(password: string): boolean {
    return Validator.value(password).strongPassword().valid
  }
}
