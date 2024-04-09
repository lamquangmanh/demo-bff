import { Inject, Injectable } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import { GetSampleUseCaseAbstract } from '@src/domain/use-cases/get-sample.abstract';

@Injectable()
export class GetSampleUseCase implements GetSampleUseCaseAbstract {
  constructor(@Inject(LoggerAbstract) private logger: LoggerAbstract) {
    this.logger.init('UserUseCaseModule', 'AddSampleUseCase');
  }

  execute() {
    this.logger.info('hiiii');

    return {
      name: 'hello word',
    };
  }
}
