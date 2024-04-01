import { Resolver, Query } from '@nestjs/graphql';
import { SampleSchema } from './sample.schema';
import { AddSampleUseCase, GetSampleUseCase } from 'src/use-cases/sample';

@Resolver(() => SampleSchema)
export class SampleResolver {
  constructor(
    private addSampleUseCase: AddSampleUseCase,
    private getSampleUseCase: GetSampleUseCase,
  ) {}

  @Query(() => SampleSchema, { name: 'Sample' })
  async samples() {
    return this.getSampleUseCase.execute();
  }
}
