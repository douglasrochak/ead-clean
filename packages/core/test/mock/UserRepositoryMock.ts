import { User, UserRepository } from "../../src"


export default class UserRepositoryMock implements UserRepository {
    constructor(private readonly users: User[] = []) {}

    async save(user: User): Promise<User> {
        const index = this.users.findIndex((c) => c.id.value === user.id.value)
        if (index >= 0) {
            this.users[index] = user
        } else {
            this.users.push(user)
        }
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find((u) => u.email.value === email) ?? null
    }
}
