import Validator from "../../src/shared/Validator"

export default class UserName {
  constructor(
  readonly fullName: string,
  attribute?: string,
  object?: string,
  ) {
      this.fullName = fullName?.trim() ?? ""

      Validator.value(fullName, attribute, object)
      .notEmpty()
      .sizeGreaterThanOrEqual(4)
      .sizeLessThanOrEqual(120)
      .regex(/^[a-zA-ZÀ-ú'\.-\s]*$/, "INVALID_CHARACTERS")
      .throwIfError()

      Validator.value(this.fullName.split(" ")[1], attribute)
      .notEmpty("INVALID_LAST_NAME")
      .throwIfError()
    }

    get firstName() {
      return this.fullName.split(" ")[0]
    }

    get surnames() {
      return this.fullName.split(" ").slice(1)
    }

    get lastName() {
      return this.fullName.split(" ").pop()
    }
}
