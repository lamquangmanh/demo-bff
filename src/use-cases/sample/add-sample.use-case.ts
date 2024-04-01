import { Injectable } from '@nestjs/common';
import { ISample } from 'src/domain/entities';

@Injectable()
export class AddSampleUseCase {
  execute({ name }: { name: string }): ISample {
    return {
      name,
    };
  }
}
