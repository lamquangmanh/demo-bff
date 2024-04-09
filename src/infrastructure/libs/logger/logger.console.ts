import { Injectable, Scope } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import logger from 'pino';
@Injectable({ scope: Scope.TRANSIENT })
export class ConsoleLogger implements LoggerAbstract {
  private requestId: string;
  private userId: string;
  private moduleName: string;
  private providerName: string;

  init(moduleName: string, providerName: string) {
    this.moduleName = moduleName;
    this.providerName = providerName;
  }

  setRequestContext(requestId: string, userId: string) {
    this.requestId = requestId;
    this.userId = userId;
  }
  error(message: any) {
    logger({ level: 'error' }).error(
      `moduleName: ${this.moduleName} providerName: ${this.providerName} requestId: ${this.requestId} userId: ${this.userId} message: ${message}`,
    );
  }

  info(message: any) {
    logger({ level: 'info' }).info(
      `moduleName: ${this.moduleName} providerName: ${this.providerName} requestId: ${this.requestId} userId: ${this.userId} message: ${message}`,
    );
  }

  warn(message: any) {
    logger({ level: 'warn' }).warn(
      `moduleName: ${this.moduleName} providerName: ${this.providerName} requestId: ${this.requestId} userId: ${this.userId} message: ${message}`,
    );
  }

  debug(message: any) {
    logger({ level: 'debug' }).debug(
      `moduleName: ${this.moduleName} providerName: ${this.providerName} requestId: ${this.requestId} userId: ${this.userId} message: ${message}`,
    );
  }
}
