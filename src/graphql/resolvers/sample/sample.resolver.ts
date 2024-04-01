import { Resolver, Query } from '@nestjs/graphql';
import { SampleSchema } from './sample.schema';
import { AddSampleUseCase, GetSampleUseCase } from 'src/use-cases/sample';
import { Inject } from '@nestjs/common';
import { SAMPLE_USECASE } from 'src/domain/common/useCaseName/sample';

@Resolver(() => SampleSchema)
export class SampleResolver {
  constructor(
    @Inject(SAMPLE_USECASE.ADD_SAMPLE)
    private addSampleUseCase: AddSampleUseCase,
    @Inject(SAMPLE_USECASE.GET_SAMPLE)
    private getSampleUseCase: GetSampleUseCase,
  ) {}

  @Query(() => SampleSchema, { name: 'Sample' })
  async samples() {
    return this.getSampleUseCase.execute();
  }
}
