import { expect, test } from "vitest";
import Email from "../../src/shared/Email";
import Test from "../utils/Test";

test("Should create a valid email", () => {
    const email = new Email("fulano@zmail.com");
    expect(email.value).toBe("fulano@zmail.com");
});

test("Should return the username", () => {
    const email = new Email("fulano@zmail.com");
    expect(email.username).toBe("fulano");
});

test("Should return the domain", () => {
    const email = new Email("fulano@zmail.com");
    expect(email.domain).toBe("zmail.com");
});

test("Should validate email", () => {
    expect(Email.isValid("user@email.com")).toBeTruthy();
    expect(Email.isValid("user@email")).toBeFalsy();
});

test("Should throw an error when creating an invalid email", () => {
    Test.withError(() => new Email(), { code: "INVALID_EMAIL" });
    Test.withError(() => new Email(""), { code: "INVALID_EMAIL" });
    Test.withError(() => new Email("fulano"), { code: "INVALID_EMAIL" });
    Test.withError(() => new Email("fulano@zmail"), { code: "INVALID_EMAIL" });
});
