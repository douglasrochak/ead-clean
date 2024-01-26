export default interface CryptoProvider {
  encrypt(password: string): string
  compare(password: string, hash: string): boolean
}
