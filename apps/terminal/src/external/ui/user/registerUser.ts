import { RegisterUser } from "core";
import BcryptCryptoProvider from "../../auth/BcryptCryptoProvider";
import UserRepositoryPrisma from "../../db/UserRepositoryPrisma";
import Terminal from "../util/Terminal";

export async function registerUser(){
  Terminal.title("Register User")

  const name = await Terminal.requiredInput("Name:")
  const email = await Terminal.requiredInput("Email:")
  const password = await Terminal.requiredInput("Password:", { echo: false })
  const admin = await Terminal.confirmInput("Admin?")

  const userRepo = new UserRepositoryPrisma()
  const cryptoProvider = new BcryptCryptoProvider()
  try {
    const registerUser = new RegisterUser(userRepo, cryptoProvider)
    await registerUser.execute({ name ,email, password, admin })
    Terminal.success("User registered successfully!")
  } catch (error) {
    Terminal.error(JSON.stringify(error, null, 2))
  } finally {
    await Terminal.awaitEnterToContinue()
  }

}
