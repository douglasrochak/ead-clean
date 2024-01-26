import { expect, test } from "vitest";
import Test from "../utils/Test";
import UserName from "../../src/shared/UserName";

test("Should throw an error when trying to create an empty name", () => {
  Test.withError(() => new UserName(undefined as any), { code: "EMPTY" });
  Test.withError(() => new UserName(""), { code: "EMPTY" });
});

test("Should throw multiple errors when trying to create an empty name", () => {
  Test.withError(() => new UserName(undefined as any), { code: "EMPTY" });
});

test("Should throw an error when trying to create a name less than 3 characters", () => {
  Test.withError(() => new UserName("L Z"), { code: "SMALL_SIZE" });
});

test("Should throw an error when trying to create a name larger than 120 characters", () => {
  const giantName =
      "Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga de Bragança e Habsburgo";
  Test.withError(() => new UserName(giantName), { code: "LARGE_SIZE" });
});

test("Should throw an error when trying to create a name without a surname", () => {
  Test.withError(() => new UserName("Guilherme"), { code: "INVALID_LAST_NAME" });
});

test("Should throw an error when trying to create a name with special characters", () => {
  Test.withError(() => new UserName("João @OOOJoao"), {
      code: "INVALID_CHARACTERS",
  });
});

test("Should create a name with two surnames", () => {
  const name = new UserName("João Silva Pereira");
  expect(name.fullName).toBe("João Silva Pereira");
  expect(name.firstName).toBe("João");
  expect(name.surnames).toEqual(["Silva", "Pereira"]);
  expect(name.lastName).toBe("Pereira");
});

test("Should create a name with an apostrophe", () => {
  const nameWithApostrophe = "João D'Ávila";
  const name = new UserName(nameWithApostrophe);
  expect(name.fullName).toBe(nameWithApostrophe);
});
