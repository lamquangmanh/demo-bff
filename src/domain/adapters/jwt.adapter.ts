import { JwtPayloadInterface } from '@domain/interfaces/jwt';

export abstract class JwtAdapter {
  abstract verify(token: string): Promise<JwtPayloadInterface | null>;
}
