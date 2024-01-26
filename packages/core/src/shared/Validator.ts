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

  static combine(...validators: Validator[]): ErrorValidate[] | null {
    const errorFiltered = validators
    .flatMap(validator => validator.errors)
    .filter(error => error !== null) as ErrorValidate[]
    return errorFiltered.length > 0 ? errorFiltered : null
  }

  null(error: string = "NOT_NULL"): Validator {
    return this.value === null || this.value === undefined
      ? this
      : this.addError(error)
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

  sizeGreaterThan(minSize: number, error: string = "SIZE_TOO_SMALL"): Validator {
    if (!this.value) return this
    return this.value.length > minSize ? this
    : this.addError({ code: error, min: minSize })
  }

  sizeLessThan(maxSize: number, error: string = "SIZE_EXCEEDS_LIMIT"): Validator {
    if (!this.value) return this
    return this.value.length < maxSize 
    ? this
    : this.addError(error)
  }

  sizeLessThanOrEqual(maxSize: number, error: string = "SIZE_EXCEEDS_LIMIT"): Validator {
    if (!this.value) return this
    return this.value.length <= maxSize 
    ? this
    : this.addError(error)

  }

  sizeGreaterThanOrEqual(minSize: number, error: string = "SIZE_TOO_SMALL"): Validator {
    if (!this.value) return this
    return this.value.length >= minSize 
    ? this
    : this.addError(error)
  }

  lessThan(max: number, error: string = "SIZE_EXCEEDS_LIMIT"): Validator {
    return this.value < max ? this : this.addError({ code: error, max });
  }

  lessThanOrEqual(max: number, error: string = "SIZE_EXCEEDS_LIMIT"): Validator {
      return this.value <= max ? this : this.addError({ code: error, max });
  }

  greaterThan(min: number, error: string = "SIZE_TOO_SMALL"): Validator {
      return this.value > min ? this : this.addError({ code: error, min });
  }

  greaterThanOrEqual(min: number, error: string = "SIZE_TOO_SMALL"): Validator {
      return this.value >= min ? this : this.addError({ code: error, min });
  }

  uuid(error: string = "INVALID_ID"): Validator {
    return validate(this.value) ? this : this.addError(error)
  }

  url(error: string = "INVALID_URL"): Validator {
    try {
      new URL(this.value)
      return this
    } catch {
      return this.addError(error)
    }
  }

  email(error: string = "INVALID_EMAIL"): Validator {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    return regex.test(this.value) ? this : this.addError(error)
  }

  passwordHash(error: string = "INVALID_PASSWORD_HASH"): Validator {
    const regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/
    return regex.test(this.value) ? this : this.addError(error)
  }

  strongPassword(error: string = "WEAK_PASSWORD"): Validator {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    return regex.test(this.value) ? this : this.addError(error)
  }

  regex(regex: RegExp, error: string = "INVALID_REGEX"): Validator {
    return regex.test(this.value) ? this : this.addError(error)
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
