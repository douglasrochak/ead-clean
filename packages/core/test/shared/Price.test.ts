import { expect, test } from "vitest"
import Price from "../../src/shared/Price"
import Test from "../utils/Test"

test("Should create a price", () => {
    const price = new Price(123.33)
    expect(price.value).toBe(123.33)
})

test("Should create a zero price", () => {
    const price = new Price(0)
    expect(price.value).toBe(0)
})

test("Should throw error with negative price", () => {
    Test.withError(() => new Price(-10, "Price"), {
        code: "SMALL_SIZE",
        attribute: "Price",
        min: 0,
        value: -10,
    })
})

test("Should format price in Brazilian Real", () => {
    const price = new Price(100, "Price")
    expect(price.formatted()).toBe("R$ 100,00")
})

test("Should format price in US Dollar", () => {
    const price = new Price(100, "Price")
    expect(price.formatted("en-US", "USD")).toBe("$100.00")
})
