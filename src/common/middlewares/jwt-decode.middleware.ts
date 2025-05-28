import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtDecodeMiddleware.name);
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = String(
      req.headers['Authorization'] || req.headers['authorization'],
    );

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      try {
        // Only decode, don't verify
        req['user'] = this.jwtService.decode(token, { json: true });
      } catch (err: any) {
        this.logger.error('JWT decode error:', err.message);
        req['user'] = null;
      }
    } else {
      this.logger.warn('No authorization header found or invalid format');
      req['user'] = null;
    }

    next();
  }
}
