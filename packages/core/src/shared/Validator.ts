import { validate } from "uuid";
import { ErrorValidate } from "../error/ErrorValidate";

export default class Validator {
  private constructor(
    readonly value: any,
    readonly attribute: string | null,
    readonly object: string | null,
    readonly errors: ErrorValidate[] = []
  ) {}

  static value(valor: any, attribute?: string, object?: string): Validator {
    return new Validator(valor, attribute ?? null, object ?? null)
  }

  static throwError(error: string): never {
    throw [{code: error} as ErrorValidate]
  }

  notNull(error: string = "NULL"): Validator {
    return this.value !== null && this.value !== undefined
    ? this : this.addError(error)
  }

  notEmpty(error: string = "EMPTY"): Validator {
    const validator = this.notNull(error)
    if (Array.isArray(validator.value)) {
      return validator.value.length > 0 ? validator : validator.addError(error)
    }
    return validator.value?.trim() !== "" ? validator : validator.addError(error)
  }

  uuid(error: string = "INVALID_ID"): Validator {
    return validate(this.value) ? this : this.addError(error)
  }

  private addError(codeOrError: string | ErrorValidate): Validator {
    const baseError = typeof codeOrError === "string" ? {code: codeOrError} : codeOrError
    const error = {
      ...baseError,
      valor: this.value,
      attribute: this.attribute ?? undefined,
      object: this.object ?? undefined,
    }

    if(this.alreadyHasError(error)) return this
    return new Validator(this.value, this.attribute, this.object, [...this.errors, error])
  }

  get valid(): boolean {
    return this.errors.length === 0
  }

  get invalid(): boolean {
    return !this.valid
  }

  throwIfError(): void | never {
    if(!this.errors.length) return
    throw this.errors
  }

  private alreadyHasError(error: ErrorValidate): boolean {
    return this.errors.some(e => {
      return Object.keys(e).every(key => e[key] === error[key])
    })
  }


}
