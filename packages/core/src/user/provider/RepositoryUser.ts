import { User } from "..";

export default interface RepositoryUser {
  save(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
