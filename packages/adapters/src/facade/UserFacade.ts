import { CryptoProvider, RegisterUser, UserLogin, UserRepository } from "core";
import { UserDTO } from "..";

export default class UserFacade {
  constructor(
    private readonly repo?: UserRepository,
    private readonly cryptoProvider?: CryptoProvider
  ) {
    
  }

  async registerUser(userDTO: UserDTO): Promise<void> {
    const useCase = new RegisterUser(this.repo!, this.cryptoProvider!)
    await useCase.execute({
      name: userDTO.name!,
      email: userDTO.email!,
      password: userDTO.password!
    })
  }

  async login(userDTO: UserDTO): Promise<UserDTO> {
    const useCase = new UserLogin(this.repo!, this.cryptoProvider!)
    const user = await useCase.execute({
      email: userDTO.email!,
      password: userDTO.password!
    })
    
    return {...user.props, createdAt: undefined, updatedAt: undefined} as any
  }
}
