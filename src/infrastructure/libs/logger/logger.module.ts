import { Global, Module } from '@nestjs/common';
import { ConsoleLogger } from './logger.console';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';

@Global()
@Module({
  providers: [{ provide: LoggerAbstract, useClass: ConsoleLogger }],
  exports: [LoggerAbstract],
})
export class LoggerModule {}
