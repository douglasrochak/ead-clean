import Validator from "./Validator"

export default class Quantity {
  constructor(
    readonly value: number = 1,
    readonly min: number = 1,
    attribute?: string,
    object: string = 'Quantity',
  ) {
    this.value = value
    Validator.value(value, attribute, object)
      .notNull()
      .greaterThanOrEqual(min)
      .throwIfError()
  }

  add(quantity: Quantity): Quantity {
    return new Quantity(this.value + quantity.value, this.min)
  }

  get zero(): boolean {
    return this.value === 0
  }

  equal(quantity: Quantity): boolean {
    return this.value === quantity.value
  }

  notEqual(quantity: Quantity): boolean {
    return !this.equal(quantity)
  }
}
