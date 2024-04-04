import { Resolver, Query } from '@nestjs/graphql';
import { SampleSchema } from './sample.schema';
import { AddSampleUseCaseAbstract, GetSampleUseCaseAbstract } from '@src/domain/use-cases';
import { Header } from '../../common/decorators/header.decorator';

@Resolver(() => SampleSchema)
export class SampleResolver {
  constructor(
    private addSampleUseCase: AddSampleUseCaseAbstract,
    private getSampleUseCase: GetSampleUseCaseAbstract,
  ) {}

  @Query(() => SampleSchema, { name: 'sample' })
  async samples(@Header() header) {
    console.log('header===', header);
    return this.getSampleUseCase.execute();
  }
}
