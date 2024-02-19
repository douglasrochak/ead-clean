import Validator from "./Validator"

export default class Order {
  
  constructor(
    readonly value?: number,
    attribute: string = 'order',
    object: string = 'class'
  ) {
    this.value = value
    Validator.value(value, attribute, object)
      .notNull()
      .greaterThanOrEqual(0)
      .throwIfError()
  }

  equal(order: Order): boolean {
    return this.value === order.value
  }

  notEqual(order: Order): boolean {
    return this.value !== order.value
  }

  compare(order: Order): number {
    if(this.equal(order)) return 0
    return this.value! > order.value! ? 1 : -1
  }

}
