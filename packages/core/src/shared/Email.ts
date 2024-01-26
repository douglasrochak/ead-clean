import Validator from "../../src/shared/Validator"

export default class Email {
  constructor(
    readonly value: string = "",
    attribute?: string,
    object?: string,
  ) {
    this.value = value.trim()
    Validator.value(this.value, attribute, object)
    .email()
    .throwIfError()
  }

  get username(): string {
    return this.value.split("@")[0]!
  }

  get domain(): string {
    return this.value.split("@")[1]!
  }

  static isValid(email: string): boolean {
    return Validator.value(email).email().valid
  }
}
