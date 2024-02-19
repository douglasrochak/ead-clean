import Validator from "../../src/shared/Validator"
import SimpleText from "./SimpleText"

export default class UserName extends SimpleText {
  constructor(
  readonly fullName: string,
  attribute?: string,
  object?: string,
  ) {
      super(fullName, 4, 120, attribute, object)
      this.fullName = fullName?.trim() ?? ""

      Validator.value(fullName, attribute, object)
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
