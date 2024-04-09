import { Injectable, Scope } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerAbstract {
  private _requestId: string;
  private _userId: string;
  private _moduleName: string;
  private _providerName: string;

  init(moduleName: string, providerName: string) {
    this._moduleName = moduleName;
    this._providerName = providerName;
  }

  setRequestContext(requestId: string, userId: string) {
    this._requestId = requestId;
    this._userId = userId;
  }
  error(message: any) {
    console.error(
      `module-name: ${this._moduleName} provider-name: ${this._providerName} x-request-id: ${this._requestId} user-id: ${this._userId} message: ${message}`,
    );
  }

  info(message: any) {
    console.info(
      `module-name: ${this._moduleName} provider-name: ${this._providerName} x-request-id: ${this._requestId} user-id: ${this._userId} message: ${message}`,
    );
  }

  warn(message: any) {
    console.warn(
      `module-name: ${this._moduleName} provider-name: ${this._providerName} x-request-id: ${this._requestId} user-id: ${this._userId} message: ${message}`,
    );
  }

  debug(message: any) {
    console.debug(
      `module-name: ${this._moduleName} provider-name: ${this._providerName} x-request-id: ${this._requestId} user-id: ${this._userId} message: ${message}`,
    );
  }
}
