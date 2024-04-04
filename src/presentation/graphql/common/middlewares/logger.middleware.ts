import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(LoggerAbstract) private logger: LoggerAbstract) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.setRequestId(
      req.headers['x-request-id'] ? req.headers['x-request-id'] : (uuid() as any),
    );
    next();
  }
}
