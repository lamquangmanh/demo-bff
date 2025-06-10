import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { parse } from 'graphql';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtDecodeMiddleware.name);
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const isPublicOperation = this.isPublicOperation(req);
    if (isPublicOperation) {
      return next();
    }

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

  isPublicOperation(req: Request): boolean {
    if (!req.body?.query) return false;
    try {
      const operationAst = parse(req.body.query).definitions[0];

      // Check the operation/mutation name
      const operationName = (operationAst as any)?.selectionSet?.selections[0]
        ?.name?.value;

      const publicOperations = ['login', 'register', 'publicMutation']; // <- Add yours here

      return publicOperations.includes(operationName ?? '');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      return false;
    }
  }
}
