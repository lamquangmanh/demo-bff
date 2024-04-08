import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class Logger extends ConsoleLogger {
  private requetId: string;

  setRequestId(requestId: string) {
    this.requetId = requestId;
  }
  error(message: any, userId?: string, stack?: string, context?: string) {
    super.error(`${message} x-request-id: ${this.requetId} [${userId}]`, stack, context);
  }

  log(message: any, userId?: string, context?: string) {
    super.error(`${message} x-request-id: ${this.requetId} [${userId}]`, context);
  }

  warn(message: any, userId?: string, context?: string) {
    super.error(`${message} x-request-id: ${this.requetId} [${userId}]`, context);
  }

  debug(message: any, userId?: string, context?: string) {
    super.error(`${message} x-request-id: ${this.requetId} [${userId}]`, context);
  }

  verbose(message: any, userId?: string, context?: string) {
    super.error(`${message} x-request-id: ${this.requetId} [${userId}]`, context);
  }

  fatal(message: any, userId?: string, context?: string) {
    super.error(`${message} x-request-id: ${this.requetId} [${userId}]`, context);
  }
}
