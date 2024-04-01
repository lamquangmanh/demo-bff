import { Resolver, Query } from '@nestjs/graphql';
import { SampleSchema } from './sample.schema';
import { AddSampleUseCaseAbstract, GetSampleUseCaseAbstract } from '@src/domain/use-cases';

@Resolver(() => SampleSchema)
export class SampleResolver {
  constructor(
    private addSampleUseCase: AddSampleUseCaseAbstract,
    private getSampleUseCase: GetSampleUseCaseAbstract,
  ) {}

  @Query(() => SampleSchema, { name: 'Sample' })
  async samples() {
    try {
      return this.getSampleUseCase.execute();
    } catch (err) {
      console.log('err===', err);
      throw err;
    }
  }
}
