import { expect, test } from "vitest";
import Url from "../../src/shared/Url";
import Test from "../utils/Test";

test('Should return the full domain of the url', () => {
    const url = new Url('https://www.google.com/search?q=typescript');
    expect(url.hostname).toBe('www.google.com');
});

test('Should return the protocol of the url', () => {
    const url = new Url('https://www.google.com/search?q=typescript');
    expect(url.protocol).toBe('https:');
});

test('Should return the path of the url', () => {
    const url = new Url('https://www.google.com/search?q=typescript');
    expect(url.pathname).toBe('/search');
});

test('Should return the params of the url', () => {
    const url = new Url('https://www.google.com/search?q=typescript&hl=pt-BR');
    expect(url.params).toEqual({ q: 'typescript', hl: 'pt-BR' });
    expect(url.params.q).toBe('typescript');
    expect(url.params.hl).toBe('pt-BR');
});

test('Should throw an error with invalid url', () => {
    Test.withError(() => new Url(undefined as any), { code: "INVALID_URL" });
    Test.withError(() => new Url(''), { code: "INVALID_URL" });
    Test.withError(() => new Url('www.google.com'), { code: "INVALID_URL" });
    Test.withError(() => new Url('https//www.google.com'), { code: "INVALID_URL" });
});

test('Should validate url', () => {
    expect(Url.isValid('https://www.google.com/search?q=typescript')).toBeTruthy();
    expect(Url.isValid('www.google.com')).toBeFalsy();
});
