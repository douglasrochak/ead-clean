import { CryptoProvider } from "../../src"

export default class CryptoProviderMock implements CryptoProvider {
    crypto(_: string): string {
        return "$2a$12$2Wn08lE/gzq9VihLoMSVbe7fdAoCOMg6uVE3RQaJnEJc5Wa7eXuly"
    }
    compare(senha: string, _: string): boolean {
        return senha === "!Senha123"
    }
}
