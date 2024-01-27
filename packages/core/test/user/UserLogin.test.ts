import UserRepositoryMock from "../mock/UserRepositoryMock";
import Test from "../utils/Test";
import UserBuilder from "../data/UserBuilder";
import { expect, test } from "vitest";
import { UserLogin } from "../../src";
import CryptoProviderMock from "../mock/CryptoProviderMock";

test("Should return a valid user", async () => {
    const email = "exists@email.com";
    const password = "!Senha123";
    const useCase = new UserLogin(
        new UserRepositoryMock([UserBuilder.create().withEmail(email).now()]),
        new CryptoProviderMock()
    );

    const user = await useCase.execute({ email, password });
    expect(user.email.value).toBe(email);
    expect(user.password).toBeNull();
});

test("Should throw an exception for user not found", async () => {
    const useCase = new UserLogin(
        new UserRepositoryMock(),
        new CryptoProviderMock()
    );
    const email = "doesnotexist@email.com";
    const password = "123456789";
    await Test.withSyncError(() => useCase.execute({ email, password }), {
        code: "USER_NOT_FOUND",
    });
});

test("Should throw an exception for wrong password", async () => {
    const email = "exists@email.com";
    const password = "123456789";
    const useCase = new UserLogin(
        new UserRepositoryMock([UserBuilder.create().withEmail(email).now()]),
        new CryptoProviderMock()
    );
    await Test.withSyncError(() => useCase.execute({ email, password }), {
        code: "INCORRECT_PASSWORD",
    });
});
