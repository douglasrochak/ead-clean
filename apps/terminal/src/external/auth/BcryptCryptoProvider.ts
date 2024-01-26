import { CryptoProvider } from "core";

import bcrypt from 'bcrypt'

export default class BcryptCryptoProvider implements CryptoProvider {
  
  encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
  }

  compare(password: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(password, encryptedPassword)
  }
}
