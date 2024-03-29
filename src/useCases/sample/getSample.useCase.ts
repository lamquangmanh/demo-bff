import { Injectable } from '@nestjs/common';

@Injectable()
export class GetSampleUseCase {
  execute() {
    return {
      name: 'hello word',
    };
  }
}
