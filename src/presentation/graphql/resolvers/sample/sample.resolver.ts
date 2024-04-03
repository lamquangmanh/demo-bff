import { Resolver, Query } from '@nestjs/graphql';
import { SampleSchema } from './sample.schema';
import { AddSampleUseCaseAbstract, GetSampleUseCaseAbstract } from '@src/domain/use-cases';

@Resolver(() => SampleSchema)
export class SampleResolver {
  constructor(
    private addSampleUseCase: AddSampleUseCaseAbstract,
    private getSampleUseCase: GetSampleUseCaseAbstract,
  ) {}

  @Query(() => SampleSchema, { name: 'sample' })
  async samples() {
    return this.getSampleUseCase.execute();
  }
}
