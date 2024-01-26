export default interface CryptoProvider {
  crypto(password: string): string
  compare(password: string, hash: string): boolean
}
