import { Injectable } from '@nestjs/common';
import { Sample } from 'src/domain/entities';

@Injectable()
export class AddSampleUseCase {
  execute({ name }: { name: string }): Sample {
    return {
      name,
    };
  }
}
