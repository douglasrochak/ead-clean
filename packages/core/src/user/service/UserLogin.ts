
import { CryptoProvider, User, UserRepository } from "..";
import Email from "../../shared/Email";
import UseCase from "../../shared/UseCase";
import Validator from "../../shared/Validator";

export type Input = { email: string, password: string}

export default class UserLogin implements UseCase<Input, User> {
  constructor(
    private repo: UserRepository,
    private cryptoProvider: CryptoProvider
  ) {}

  async execute(input: Input): Promise<User> {
    const email = new Email(input.email, "email")
    const userFound = await this.repo.findByEmail(email.value)

    if(!userFound) Validator.throwError("USER_NOT_FOUND")
    if(!userFound.password) Validator.throwError("INVALID_PASSWORD")

    if(!this.cryptoProvider.compare(input.password, userFound.password.value)) Validator.throwError("INCORRECT_PASSWORD")

    return userFound.withoutPassword() 
  }
}
