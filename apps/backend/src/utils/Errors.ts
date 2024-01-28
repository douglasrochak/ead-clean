export default class Errors {
  static handle(error: unknown): unknown[] {
    if(error instanceof Array) return error
    if(error instanceof Error) {
      return [{code: "UNKNOWN_ERROR", message: error.message}]
    }
    return [{code: "UNKNOWN_ERROR"}]
  } 
}
