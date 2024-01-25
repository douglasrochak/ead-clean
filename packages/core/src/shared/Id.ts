import { v4 as uuidv4 } from 'uuid';
import Validator from './Validator';

export default class Id {
  readonly value: string

  constructor(value?: string, attribute?: string, object?: any) {
    this.value = value ?? uuidv4();
    Validator.value(this.value, attribute, object).uuid().throwIfError()
  }

  static get new() {
    return new Id()
  }

  same(id: Id) {
    return this.value === id.value
  }

  different(id: Id) { 
    return this.value !== id.value
  }
}
