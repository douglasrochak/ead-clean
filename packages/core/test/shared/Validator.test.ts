import { expect, test } from "vitest"
import Validator from "../../src/shared/Validator"
import Test from "../utils/Test"
import Id from "../../src/shared/Id";

test('Should validate null value', () => {
    expect(Validator.value(null).null().errors).toHaveLength(0);
    expect(Validator.value(undefined).null().errors).toHaveLength(0);
});

test('Should return error with non-null text', () => {
    expect(Validator.value("Good morning").null().invalid).toBe(true);
});

test('Should return error with null text', () => {
    const errorMsg = 'Invalid text';
    expect(Validator.value(null).notNull().invalid).toBe(true);
    expect(Validator.value(null).notNull(errorMsg).errors[0]!.code).toBe(errorMsg);
});

test('Should validate with non-empty text', () => {
    const v = Validator.value('ABC').notEmpty();
    expect(v.errors).toHaveLength(0);
});

test('Should validate with non-empty array', () => {
    const v = Validator.value([1, 2, 3]).notEmpty();
    expect(v.errors).toHaveLength(0);
});

test('Should return error with empty array', () => {
    const v = Validator.value([]).notEmpty();
    expect(v.errors).toHaveLength(1);
});

test('Should validate text size less than X', () => {
    const v = Validator.value('Good day').sizeLessThan(9);
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with text size less than X', () => {
    const v = Validator.value('Good day').sizeLessThan(7);
    expect(v.errors).toHaveLength(1);
});

test('Should validate text size less than or equal to X', () => {
    const v = Validator.value('Good day').sizeLessThanOrEqual(8);
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with text size less than or equal to X', () => {
    const v = Validator.value('Good day').sizeLessThanOrEqual(6);
    expect(v.errors).toHaveLength(1);
});

test('Should validate text size greater than X', () => {
    const v = Validator.value('Good day').sizeGreaterThan(6);
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with text size greater than X', () => {
    const v = Validator.value('Good day').sizeGreaterThan(8);
    expect(v.errors).toHaveLength(1);
});

test('Should validate text size greater than or equal to X', () => {
    const v = Validator.value('Good day').sizeGreaterThanOrEqual(7);
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with text size greater than or equal to X', () => {
    const v = Validator.value('Good day').sizeGreaterThanOrEqual(9);
    expect(v.errors).toHaveLength(1);
});

test('Should validate number size less than X', () => {
    const v = Validator.value(5).lessThan(7);
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with number less than X', () => {
    const v = Validator.value(10).lessThan(8);
    expect(v.errors).toHaveLength(1);
});

test('Should validate number size less than or equal to X', () => {
    const v = Validator.value(7).lessThanOrEqual(7);
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with number less than or equal to X', () => {
    const v = Validator.value(9).lessThanOrEqual(8);
    expect(v.errors).toHaveLength(1);
});

test('Should validate number size greater than X', () => {
    const v = Validator.value(8).greaterThan(7);
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with number greater than X', () => {
    const v = Validator.value(8).greaterThan(8);
    expect(v.errors).toHaveLength(1);
});

test('Should validate number size greater than or equal to X', () => {
    const v = Validator.value(7).greaterThanOrEqual(7);
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with number greater than or equal to X', () => {
    const v = Validator.value(7).greaterThanOrEqual(8);
    expect(v.errors).toHaveLength(1);
});

test("Should ignore null value in size validation...", () => {
    const errors = Validator.combine(
        Validator.value(null).sizeLessThan(6),
        Validator.value(null).sizeLessThanOrEqual(6),
        Validator.value(null).sizeGreaterThan(6),
        Validator.value(null).sizeGreaterThanOrEqual(6)
    );
    expect(errors).toBeNull();
});

test('Should validate uuid', () => {
    const v = Validator.value(Id.new.value).uuid();
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with invalid uuid', () => {
    const v = Validator.value('123').uuid();
    expect(v.errors).toHaveLength(1);
});

test('Should validate url', () => {
    const v = Validator.value('https://google.com').url();
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with invalid url', () => {
    const v = Validator.value('google.com').url();
    expect(v.errors).toHaveLength(1);
});

test('Should validate email', () => {
    const v = Validator.value('user@email.com.br').email();
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with invalid email', () => {
    const v = Validator.value('user@email').email();
    expect(v.errors).toHaveLength(1);
});

test('Should validate password hash', () => {
    // Generated at https://bcrypt-generator.com/
    const v = Validator.value(
        '$2a$12$VWz64KAzU9P6k/sY8sdNhe/4TlALtSm4iD6QRyB73YwdC1E2vqq.W'
    ).passwordHash();
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with invalid password hash', () => {
    const v = Validator.value('#Password123').passwordHash();
    expect(v.errors).toHaveLength(1);
});

test('Should validate strong password', () => {
    const v = Validator.value('#Password123').strongPassword();
    expect(v.errors).toHaveLength(0);
});

test('Should return errors with invalid strong password', () => {
    const errors = Validator.combine(
        Validator.value('12345678').strongPassword(),
        Validator.value('VeryBigPassword123').strongPassword(),
        Validator.value('#Password').strongPassword(),
        Validator.value('#Senha1').strongPassword()
    );
    expect(errors).toHaveLength(4);
});

test("Should validate via regex that only has numbers ", () => {
    const v = Validator.value("12345678900").regex(/\d{11}/, "error");
    expect(v.errors).toHaveLength(0);
});

test("Should return error via number validation ", () => {
    const v = Validator.value("123A5678900").regex(/\d{11}/, "error");
    expect(v.errors[0]!.code).toBe("error");
});

test("Should return only one error", () => {
    const v = Validator.value("Good day")
        .sizeLessThanOrEqual(6, "error")
        .sizeLessThanOrEqual(6, "error")
        .sizeLessThanOrEqual(6, "error");
    expect(v.errors).toHaveLength(1);
});

test('Should combine errors', () => {
    const errors = Validator.combine(
        Validator.value('').notEmpty('error1'),
        Validator.value('').notEmpty('error2'),
        Validator.value('').notEmpty('error3'),
        Validator.value('Test').notEmpty('not error 4'),
        Validator.value('').notEmpty('error5')
    );

    expect(errors?.map((e) => e.code)?.join(', ')).toBe('error1, error2, error3, error5');
});

test('Should combine without errors', () => {
    const errors = Validator.combine(
        Validator.value('Good day').notEmpty('error1'),
        Validator.value('Good afternoon').notEmpty('error2'),
        Validator.value('Good night').notEmpty('error3')
    );

    expect(errors).toBeNull();
});

test('Should throw error', () => {
    Test.withError(() => Validator.throwError('ERROR_TEST'), { code: 'ERROR_TEST' });
});
