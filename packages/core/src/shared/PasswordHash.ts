import Validator from "./Validator";

export default class PasswordHash { 
  constructor(
    readonly value: string,
    attribute?: string,
    object?: string
    ) {
      Validator.value(value, attribute, object).passwordHash().throwIfError();
    }

    static isValid(hash: string): boolean {
      return Validator.value(hash).passwordHash().valid;
    }
  }
