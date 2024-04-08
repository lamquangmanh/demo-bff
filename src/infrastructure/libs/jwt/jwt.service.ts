import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtAdapter } from '@domain/adapters';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadInterface } from '@domain/interfaces/jwt';

@Injectable()
export class JwtService implements JwtAdapter {
  constructor(
    private nestJwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  async verify(token: string) {
    return this.nestJwtService.verifyAsync<JwtPayloadInterface>(token, {
      secret: this.configService.get('jwt.atKey'),
    });
  }
}
