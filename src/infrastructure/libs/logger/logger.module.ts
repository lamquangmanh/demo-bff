import { Global, Module } from '@nestjs/common';
import { Logger } from './logger.config';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';

@Global()
@Module({
  providers: [{ provide: LoggerAbstract, useClass: Logger }],
  exports: [LoggerAbstract],
})
export class LoggerModule {}
