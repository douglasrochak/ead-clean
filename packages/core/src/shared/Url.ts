import Validator from "./Validator"

export default class Url {
  private url: URL

  constructor(
    readonly value: string,
    attribute?: string,
    object?: string,
    ) {
    this.value = value
    Validator.value(value, attribute, object)
      .url().throwIfError()
    this.url = new URL(this.value)
  }

  get protocol(): string {
    return this.url.protocol
  }

  get hostname(): string {
    return this.url.hostname
  }

  get pathname(): string {
    return this.url.pathname
  }

  get params(): any {
    const params = this.url.searchParams.toString().split("&")
    return params.reduce((paramsObj, param) => {
      const [key, value] = param.split("=")
      return { ...paramsObj, [key!]: value}
    }, {} as any)
  }

  static isValid(url: string): boolean {
    return Validator.value(url).url().valid
  }


}
