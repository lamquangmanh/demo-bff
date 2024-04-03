import { Injectable } from '@nestjs/common';
import { GetSampleUseCaseAbstract } from '@src/domain/use-cases/get-sample.abstract';

@Injectable()
export class GetSampleUseCase implements GetSampleUseCaseAbstract {
  execute() {
    return {
      name: 'hello word',
    };
  }
}
