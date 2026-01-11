import {
  Injectable,
  NestMiddleware,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { parse } from 'graphql';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtDecodeMiddleware.name);
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Skip JWT validation for public paths
    const publicPaths = ['/healthz', '/health', '/metrics'];
    if (publicPaths.includes(req.path)) {
      return next();
    }

    const isPublicOperation = this.isPublicOperation(req);
    if (isPublicOperation) {
      return next();
    }

    const tokenFromCookie = req.cookies?.access_token;

    const authHeader = String(
      req.headers['Authorization'] || req.headers['authorization'],
    );

    const tokenFromHeader =
      typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.replace('Bearer ', '')
        : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      this.logger.warn('No authorization header found or invalid format');
      throw new UnauthorizedException('Missing access token');
    }

    try {
      // Only decode, don't verify
      req['user'] = this.jwtService.decode(token, { json: true });
      next();
    } catch (err: any) {
      this.logger.error('JWT decode error:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  isPublicOperation(req: Request): boolean {
    if (!req.body?.query) return false;
    try {
      const operationAst = parse(req.body.query).definitions[0];

      // Check the operation/mutation name
      const operationName = (operationAst as any)?.selectionSet?.selections[0]
        ?.name?.value;

      const publicOperations = ['login', 'register', '__schema'];

      // console.log('Public operation check:', operationName);
      return publicOperations.includes(operationName ?? '');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      return false;
    }
  }
}
