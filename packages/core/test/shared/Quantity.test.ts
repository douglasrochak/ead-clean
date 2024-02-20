import { expect, test } from "vitest"
import Quantity from "../../src/shared/Quantity"
import Test from "../utils/Test"

test("Should create a quantity", () => {
    expect(new Quantity().value).toBe(1)
})

test("Should create a zero quantity", () => {
    expect(new Quantity(0, 0).value).toBe(0)
    expect(new Quantity(0, 0).zero).toBe(true)
})

test("Should sum quantities", () => {
    const q1 = new Quantity(3)
    const q2 = new Quantity(7)
    expect(q1.add(q2).value).toBe(10)
})

test("Should compare quantities as equal", () => {
    const q1 = new Quantity(20)
    const q2 = new Quantity(20)
    expect(q1.equal(q2)).toBe(true)
    expect(q1.notEqual(q2)).toBe(false)
})

test("Should compare quantities as different", () => {
    const q1 = new Quantity(20)
    const q2 = new Quantity(21)
    expect(q1.equal(q2)).toBe(false)
    expect(q1.notEqual(q2)).toBe(true)
})

test("Should throw an error when trying to create a negative quantity", () => {
    Test.withError(() => new Quantity(-7, 0, "quantity"), {
        code: "SMALL_SIZE",
        attribute: "quantity",
        min: 0,
    })
})
