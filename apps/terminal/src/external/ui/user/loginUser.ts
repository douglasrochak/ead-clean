import { UserFacade } from "adapters";
import Terminal from "../util/Terminal";
import UserRepositoryPrisma from "../../db/UserRepositoryPrisma";
import BcryptCryptoProvider from "../../auth/BcryptCryptoProvider";

export async function loginUser(){
  Terminal.title("Login User")

  const email = await Terminal.requiredInput("Email:")
  const password = await Terminal.requiredInput("Password:", { echo: false })

  const userRepo = new UserRepositoryPrisma()
  const cryptoProvider = new BcryptCryptoProvider()

  try {
    const facade = new UserFacade(userRepo, cryptoProvider)
    const user = await facade.login({ email, password })

    Terminal.success("User logged in successfully!")
    Terminal.info(JSON.stringify(user, null, 2))
  } catch (error) {
    Terminal.error(JSON.stringify(error, null, 2))
  } finally {
    await Terminal.awaitEnterToContinue()
  }
}
