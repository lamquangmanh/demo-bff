import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class Logger extends ConsoleLogger {
  error(message: any, userId?: string, stack?: string, context?: string) {
    super.error(`${message} [${userId}]`, stack, context);
  }

  log(message: any, userId?: string, context?: string) {
    super.error(`${message} [${userId}]`, context);
  }

  warn(message: any, userId?: string, context?: string) {
    super.error(`${message} [${userId}]`, context);
  }

  debug(message: any, userId?: string, context?: string) {
    super.error(`${message} [${userId}]`, context);
  }

  verbose(message: any, userId?: string, context?: string) {
    super.error(`${message} [${userId}]`, context);
  }

  fatal(message: any, userId?: string, context?: string) {
    super.error(`${message} [${userId}]`, context);
  }
}
