import Email from "../../shared/Email";
import Entity, { EntityProps } from "../../shared/Entity";
import PasswordHash from "../../shared/PasswordHash";
import UserName from "../../shared/UserName";

export interface UserProps extends EntityProps{
  name?: string;
  email?: string
  password?: string;
  admin?: boolean;
}

export default class User extends Entity<User, UserProps> {
  readonly name: UserName;
  readonly email: Email;
  readonly password: PasswordHash | null;
  readonly admin: boolean;

  constructor(props: UserProps) {
    super(props);

    this.name = new UserName(props.name!, 'name', 'User');
    this.email = new Email(props.email, 'email', 'User')
    this.password = props.password ? new PasswordHash(props.password, 'password', 'User') : null
    this.admin = props.admin ?? false
  }

  withoutPassword(): User {
    return this.clone({ password: undefined })
  }
}
