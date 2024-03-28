import { Resolver, Query } from '@nestjs/graphql';
import { SampleSchema } from './sample.schema';

@Resolver(() => SampleSchema)
export class SampleResolver {
  constructor() {}

  @Query(() => SampleSchema, { name: 'Sample' })
  async samples() {
    return {
      name: 'hello',
    };
  }
}
