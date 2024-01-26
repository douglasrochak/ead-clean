import { expect } from "vitest";
import { ErrorValidate } from "../../src/error/ErrorValidate";

export default class Test {
  static withError(fn: () => void, ...errors: ErrorValidate[]) {
    try {
      fn()
      throw new Error("Should have thrown an error")
    } catch (error) {
      Test.checkErrorValidate(error, ...errors)
    }
  }

  static async withSyncError(fn: () => Promise<void>, ...errors: ErrorValidate[]) { 
    try {
      await fn()
      throw new Error("Should have thrown an error")
    } catch (error) {
      Test.checkErrorValidate(error, ...errors)
    }
  }

  private static checkErrorValidate(e: any, ...errors: ErrorValidate[]) {
    if(!Array.isArray(e)) throw e
    errors.forEach((error, i) => {
      if (error.code) expect(e[i]).toHaveProperty('code', error.code)
      if (error.attribute) expect(e[i]).toHaveProperty('attribute', error.attribute)
      if (error.object) expect(e[i]).toHaveProperty('object', error.object)
      if (error.value) expect(e[i]).toHaveProperty('value', error.value)
    })
  }
}
