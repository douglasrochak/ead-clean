import { User } from "..";
import StrongPassword from "../../shared/StrongPassword";
import UseCase from "../../shared/UseCase";
import Validator from "../../shared/Validator";
import CryptoProvider from "../provider/CryptoProvider";
import UserRepository from "../provider/UserRepository";

export type Input = {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export default class RegisterUser implements UseCase<Input, void> {

  constructor(
    private readonly repository: UserRepository,
    private readonly cryptoProvider: CryptoProvider,
  ) { }

  async execute(input: Input): Promise<void> {
    const { name, email, password } = input
    const strongPassword = new StrongPassword(password)
    const cryptoPassword = this.cryptoProvider.crypto(strongPassword.value)

    const userAlreadyExists = await this.repository.findByEmail(email)
    Validator.value(userAlreadyExists)
    .null("USER_ALREADY_EXISTS")
    .throwIfError()

    const newUser = new User({name, email, password: cryptoPassword})
    await this.repository.save(newUser)
  }
}
