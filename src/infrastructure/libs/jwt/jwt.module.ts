import { Module } from '@nestjs/common';
import { JwtAdapter } from '@domain/adapters';
import { JwtService } from './jwt.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Module({
  providers: [
    NestJwtService, //
    { provide: JwtAdapter, useClass: JwtService },
  ],
  exports: [JwtAdapter],
})
export class JwtModule {}
