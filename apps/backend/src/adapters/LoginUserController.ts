import { UserFacade } from "adapters";
import { CryptoProvider, UserRepository } from "core";
import { Express } from "express";
import Errors from "../utils/Errors";
import JWTProvider from "../external/auth/JWTProvider";

export default class LoginUserController {
  constructor(
    readonly server: Express,
    readonly repo: UserRepository,
    readonly cryptoProvider: CryptoProvider,
    readonly jwtProvider: JWTProvider,
  ) {
    server.post('/user/login', async (req, res) => {
      try {
        const { email, password } = req.body 
        const facade = new UserFacade(repo, cryptoProvider)
        const user = await facade.login({ email, password })
        const token = jwtProvider.generateToken({
          id: user.id, 
          name: user.name, 
          email: user.email,
          admin: user.admin
        })

        res.status(200).send({ token })
      } catch (error) {
        res.status(400).send(Errors.handle(error))
      }
    })
  }

}
