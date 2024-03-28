import { Module } from '@nestjs/common';
import { SampleResolver } from './resolvers/sample/sample.resolver';
@Module({
  imports: [],
  providers: [SampleResolver],
})
export class GraphQLResolversModule {}
