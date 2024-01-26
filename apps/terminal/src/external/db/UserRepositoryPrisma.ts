import { PrismaClient } from "@prisma/client";
import { User, UserRepository } from "core";

export default class UserRepositoryPrisma implements UserRepository {
  
  private readonly prisma = new PrismaClient()

  async save(user: User): Promise<User> {
    const newUser = await this.prisma.user.upsert({
      where: { id: user.id.value ?? -1},
      update: user.props,
      create: user.props as any,
    })

    return new User(newUser)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email}
    })

    return user ? new User(user) : null
  }
}
