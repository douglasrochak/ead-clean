import { User } from "../user";

export default interface UseCase<In, Out> {
  execute(input: In, user?: User): Promise<Out>
}
