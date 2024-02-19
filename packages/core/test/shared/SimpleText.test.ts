import { expect, test } from "vitest";
import SimpleText from "../../src/shared/SimpleText";
import Test from "../utils/Test";

test("Should return the simple name", () => {
    const name = new SimpleText("Clean Architecture", 3, 30);
    expect(name.complete).toBe("Clean Architecture");
});

test("Should throw an error with empty name", () => {
    expect(() => new SimpleText(undefined as any, 3, 50)).toThrow();
    expect(() => new SimpleText("", 3, 50)).toThrow();
});

test("Should throw an error with name too small", () => {
    Test.withError(() => new SimpleText("Arq", 4, 30), { code: "SMALL_SIZE" });
});

test("Should throw an error with name too large", () => {
    Test.withError(() => new SimpleText("Arquitetura Limpa", 3, 10), {
        code: "LARGE_SIZE",
    });
});
