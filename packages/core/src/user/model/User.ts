import Entity, { EntityProps } from "../../shared/Entity";

export interface UserProps extends EntityProps{
  name?: string;
  email?: string
  password: string;
  admin?: boolean;
}

export default class User extends Entity<User, UserProps> {

}
