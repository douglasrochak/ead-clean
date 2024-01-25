import { expect, test } from "vitest";
import Id from "../../src/shared/Id";
import Test from "../utils/Test";

test('Should create a new valid ID', () => {
  const id = Id.new
  expect(id.value).toHaveLength(36)
})

test('Should throw an error when attempting to create an invalid ID', () => {
  Test.withError(() => new Id('123456'), { code: "INVALID_ID"})
})

test('Should create a new valid ID from an existing ID', () => {
  const value = Id.new.value
  const id = new Id(value)
  expect(id.value).toHaveLength(36)
  expect(id.value).toBe(value)
})

test('Should test as true for equal IDs', () => {
  const id1 = Id.new
  const id2 = new Id(id1.value)
  expect(id1.same(id2)).toBe(true)
  expect(id1.different(id2)).toBe(false)
})

test('Should test false for different IDs', () => {
  const id1 = Id.new
  const id2 = Id.new
  expect(id1.same(id2)).toBe(false)
  expect(id1.different(id2)).toBe(true)
})
