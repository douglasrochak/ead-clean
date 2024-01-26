import { expect, test } from 'vitest';

import { RegisterUser } from '../../src';
import CryptographyProviderMock from '../mock/CryptoProviderMock';
import UserRepositoryMock from '../mock/UserRepositoryMock';
import Test from '../utils/Test';

test('Should register a user', async () => {
    const repo = new UserRepositoryMock();
    const useCase = new RegisterUser(repo, new CryptographyProviderMock());
    const name = 'New User';
    const email = 'new@email.com';
    const password = '!Senha123';
    await useCase.execute({ name, email, password });

    expect(repo.findByEmail(email)).toBeDefined();
});

test('Should throw an error with invalid attributes', async () => {
    const repo = new UserRepositoryMock();
    const useCase = new RegisterUser(repo, new CryptographyProviderMock());
    const name = 'NewName';
    const email = 'new@email.com';
    const password = '!Senha123';

    Test.withSyncError(() => useCase.execute({ name, email, password }), {
        code: 'INVALID_LAST_NAME',
    });
});
