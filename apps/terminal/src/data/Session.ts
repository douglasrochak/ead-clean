import { UserDTO } from "adapters";
import { jwtDecode } from "jwt-decode";

export default class Session {
  private static _user: UserDTO | null

  static init(token: string) {
    this._user = jwtDecode(token) as UserDTO
  }

  static endSession() {
    Session._user = null
  }

  static get user() {
    return Session._user
  }

}
