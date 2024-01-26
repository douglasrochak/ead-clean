import { User, UserProps } from "../../src"
import { faker } from "@faker-js/faker"

export default class UserBuilder {
    private constructor(private props: UserProps) {}

    static create() {
        return new UserBuilder({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: '$2a$12$l4uqYBbpysvi.FY24ZXia.6r8b1W91W2Ekru69xSZnKXdY5QJ9o/m',
            admin: false,
        })
    }

    withId(id: string): UserBuilder {
        this.props.id = id
        return this
    }

    withoutId(): UserBuilder {
        this.props.id = undefined
        return this
    }

    withName(name: string): UserBuilder {
        this.props.name = name
        return this
    }

    withoutName(): UserBuilder {
        this.props.name = undefined
        return this
    }

    withEmail(email: string): UserBuilder {
        this.props.email = email
        return this
    }

    withoutEmail(): UserBuilder {
        this.props.email = undefined
        return this
    }

    withPassword(password: string): UserBuilder {
        this.props.password = password
        return this
    }

    withoutPassword(): UserBuilder {
        this.props.password = undefined
        return this
    }

    admin(): UserBuilder {
        this.props.admin = true
        return this
    }

    notAdmin(): UserBuilder {
        this.props.admin = false
        return this
    }

    semAdmin(): UserBuilder {
        this.props.admin = undefined
        return this
    }

    now(): User {
        return new User(this.props)
    }
}
