import { expect, test } from "vitest"
import StrongPassword from "../../src/shared/StrongPassword"
import Test from "../utils/Test"

test("Should throw an error with an empty password", () => {
  Test.withError(() => new StrongPassword(), { code: "WEAK_PASSWORD" })
  Test.withError(() => new StrongPassword(""), { code: "WEAK_PASSWORD" })
})

test("Should throw an error with a password consisting only of numbers", () => {
  Test.withError(() => new StrongPassword("1234567890"), { code: "WEAK_PASSWORD" })
})

test("Should throw an error with a password consisting only of letters", () => {
  Test.withError(() => new StrongPassword("AbCdEfGhIj"), { code: "WEAK_PASSWORD" })
})

test("Should throw an error with a password consisting only of special characters", () => {
  Test.withError(() => new StrongPassword("!@#$%¨&*()_+"), { code: "WEAK_PASSWORD" })
})

test("Should throw an error with a password shorter than 8 characters", () => {
  Test.withError(() => new StrongPassword("%S3nh4%"), { code: "WEAK_PASSWORD" })
})

test("Should create a strong password", () => {
  const password = "S3nh4F0rt3%"
  expect(new StrongPassword(password).value).toBe(password)
})

test("Should validate a strong password", () => {
  expect(StrongPassword.isValid("123456")).toBeFalsy()
  expect(StrongPassword.isValid("S3nh4F0rt3%")).toBeTruthy()
})
