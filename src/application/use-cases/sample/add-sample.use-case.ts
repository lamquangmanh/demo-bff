import { Inject, Injectable } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import { AddSampleUseCaseAbstract } from '@src/domain/use-cases';
import { Sample } from 'src/domain/entities';

@Injectable()
export class AddSampleUseCase implements AddSampleUseCaseAbstract {
  constructor(@Inject(LoggerAbstract) private logger: LoggerAbstract) {}

  execute({ name }: { name: string }): Sample {
    this.logger.log('hello');

    return {
      name,
    };
  }
}
