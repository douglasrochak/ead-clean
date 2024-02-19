import { expect, test } from "vitest";
import Order from "../../src/shared/Order";
import Test from "../utils/Test";

test("Should throw an error with empty order", () => {
    Test.withError(() => new Order(), { code: "NULL" });
});

test("Should create order as 1000", () => {
    const order = new Order(1000);
    expect(order.value).toBe(1000);
});

test("Should create zero order", () => {
    const order = new Order(0);
    expect(order.value).toBe(0);
});

test("Should throw an error with negative order", () => {
    Test.withError(() => new Order(-10, "order"), {
        code: "SMALL_SIZE",
        attribute: "order",
        min: 0,
        value: -10,
    });
});

test("Should compare two orders for sorting", () => {
    const order1 = new Order(1);
    const order2a = new Order(2);
    const order2b = new Order(2);
    expect(order1.compare(order2a)).toBe(-1);
    expect(order2a.compare(order1)).toBe(1);
    expect(order2a.compare(order2b)).toBe(0);
});

test("Should compare two orders as equal", () => {
    const order1a = new Order(1);
    const order1b = new Order(1);
    expect(order1a.equal(order1b)).toBe(true);
    expect(order1a.notEqual(order1b)).toBe(false);
});

test("Should compare two orders as different", () => {
    const order1 = new Order(1);
    const order2 = new Order(2);
    expect(order1.equal(order2)).toBe(false);
    expect(order1.notEqual(order2)).toBe(true);
});
