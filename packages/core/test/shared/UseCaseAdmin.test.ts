import { expect, test } from "vitest"
import AdminUseCase from "../../src/shared/UseCaseAdmin"
import UserBuilder from "../data/UserBuilder"
import Test from "../utils/Test"

class Cubed extends AdminUseCase<number, number> {
    async executeAsAdmin(value: number): Promise<number> {
        return Math.pow(value, 3)
    }
}

test("Should throw an error with empty user", () => {
    const useCase = new Cubed()
    Test.withError(() => useCase.execute(2), {
        code: "USER_WITHOUT_PERMISSION",
    })
})

test("Should throw an error with non-admin user", () => {
    const useCase = new Cubed()
    const user = UserBuilder.create().notAdmin().now()
    Test.withError(() => useCase.execute(2, user), {
        code: "USER_WITHOUT_PERMISSION",
    })
})

test("Should execute with admin user", async () => {
    const useCase = new Cubed()
    const user = UserBuilder.create().admin().now()
    expect(useCase.execute(2, user)).resolves.toBe(8)
})
