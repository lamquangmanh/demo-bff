import { Resolver, Query } from '@nestjs/graphql';
import { SampleSchema } from './sample.schema';
import { AddSampleUseCase, GetSampleUseCase } from '@application/use-cases/sample';

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
    try {
      throw new Error('test');
      return this.getSampleUseCase.execute();
    } catch (err) {
      console.log('err===', err);
      throw err;
    }
  }
}
