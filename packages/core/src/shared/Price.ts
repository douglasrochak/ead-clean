import Validator from "./Validator"

export default class Price {
  constructor(
    readonly value: number,
    attribute?: string,
    object?: string,
  ) {
    this.value = value
    Validator.value(value, attribute, object)
      .notNull()
      .greaterThanOrEqual(0)
      .throwIfError()
  }

  formatted(_default: string = "pt-BR", currency: string = "BRL"): string {
    return Intl.NumberFormat(_default, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  }).format(this.value)
  }
}
