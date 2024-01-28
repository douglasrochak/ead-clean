import jwt from 'jsonwebtoken';

export default class JWTProvider {
  constructor(private secret: string) {}

  generateToken(payload: string | object): string {
    return jwt.sign(payload, this.secret, {expiresIn: '15d'});
  }

  verifyToken(token: string): string | object {
    return jwt.verify(token, this.secret);
  }

}
