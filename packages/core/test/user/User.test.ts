import { expect, test } from 'vitest';
import UserBuilder from '../data/UserBuilder';
import Test from '../utils/Test';

test('Should create a user', () => {
    const fullName = 'John Doe';
    const email = 'john.doe@mail.com';
    const user = UserBuilder.create().withName(fullName).withEmail(email).now();
    expect(user.name.fullName).toBe(fullName);
    expect(user.email.value).toBe(email);
    expect(user.password).toBeDefined();
});

test('Should create a user without a password', () => {
    const user = UserBuilder.create().withoutPassword().now();
    expect(user.password).toBeNull();
});

test('Should create a non-admin user by default', () => {
    const user = UserBuilder.create().notAdmin().now();
    expect(user.admin).toBeFalsy();
});

test('Should throw an error when the name is not provided', () => {
    Test.withError(() => UserBuilder.create().withoutName().now(), {
        code: 'EMPTY',
        attribute: 'name',
    });
});

test('Should throw an error when the name has no last name', () => {
    Test.withError(() => UserBuilder.create().withName('Peter').now(), {
        code: 'INVALID_LAST_NAME',
    });
});

test('Should throw an error when the user has no email', () => {
    Test.withError(() => UserBuilder.create().withoutEmail().now(), {
        code: 'INVALID_EMAIL',
    });
});
