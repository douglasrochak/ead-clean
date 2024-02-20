import { User } from "..";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default abstract class UseCaseAdmin<In, Out> implements UseCase<In, Out> {
  execute(input: In, user?: User): Promise<Out> {
    if(!user || !user.isAdmin){
      Validator.throwError("USER_WITHOUT_PERMISSION")
    }
    return this.executeAsAdmin(input, user)
  }
  
  protected abstract executeAsAdmin(input: In, user?: User): Promise<Out> 
}
