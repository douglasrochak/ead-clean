import { UserFacade } from "adapters";
import { CryptoProvider, UserRepository } from "core";
import { Express } from "express";
import Errors from "../utils/Errors";

export default class RegisterUserController {
  constructor(
    readonly server: Express,
    readonly repo: UserRepository,
    readonly cryptoProvider: CryptoProvider,
  ) {
    server.post('/user/register', async (req, res) => {
      try {
        const { name, email, password } = req.body 
        const facade = new UserFacade(repo, cryptoProvider)
        await facade.registerUser({ name, email, password })
        res.sendStatus(201)
      } catch (error) {
        res.status(400).send(Errors.handle(error))
      }
    })
  }

}
