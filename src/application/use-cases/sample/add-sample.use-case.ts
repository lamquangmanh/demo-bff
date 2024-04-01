import { Injectable } from '@nestjs/common';
import { AddSampleUseCaseAbstract } from '@src/domain/use-cases';
import { Sample } from 'src/domain/entities';

@Injectable()
export class AddSampleUseCase implements AddSampleUseCaseAbstract {
  execute({ name }: { name: string }): Sample {
    return {
      name,
    };
  }
}
