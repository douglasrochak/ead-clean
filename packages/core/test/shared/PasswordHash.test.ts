import { expect, test } from "vitest";
import PasswordHash from "../../src/shared/PasswordHash";
import Test from "../utils/Test";

test('Should throw an error with a password consisting only of numbers', () => {
    Test.withError(() => new PasswordHash('1234567890'), { code: "INVALID_HASH" });
});

test('Should throw an error with a password consisting only of letters', () => {
    Test.withError(() => new PasswordHash('AbCdEfGhIj'), { code: "INVALID_HASH" });
});

test('Should throw an error with a password consisting only of special characters', () => {
    Test.withError(() => new PasswordHash('!@#$%¨&*()_+'), { code: "INVALID_HASH" });
});

test('Should throw an error with a password less than 8 characters', () => {
    Test.withError(() => new PasswordHash('%S3nh4%'), { code: "INVALID_HASH" });
});

test('Should create a password with a valid hash', () => {
    // Generated at https://bcrypt-generator.com/
    const hashes = [
        '$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6',
        '$2a$08$7uZhkstRVOk84If8gt0r4eWih3nfGdWduZpIcj1MzNJiS.UgIEF7.',
        '$2a$13$VHgPnA1ymVG3QsTyCZ8GG.IfZ4jljSbI/MSgRSx6Tbj2jXxfgdjoC',
        '$2a$13$7/Gb19Ma6OsiFR/UsGBMKej/Eun98.d2x0IUtGku1gh4FCZEpRVfq',
    ];

    expect(new PasswordHash(hashes[0]!)).toBeDefined();
    expect(new PasswordHash(hashes[1]!)).toBeDefined();
    expect(new PasswordHash(hashes[2]!)).toBeDefined();
    expect(new PasswordHash(hashes[3]!)).toBeDefined();
});

test('Should validate password hash', () => {
    expect(PasswordHash.isValid('123456')).toBeFalsy();
    expect(PasswordHash.isValid('S3nh4F0rt3%')).toBeFalsy();
    expect(PasswordHash.isValid('$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6')).toBeTruthy();
});
