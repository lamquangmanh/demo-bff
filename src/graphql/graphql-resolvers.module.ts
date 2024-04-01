import { Module } from '@nestjs/common';
import { SampleResolver } from './resolvers/sample/sample.resolver';
import { UseCaseManagerModule } from 'src/use-cases/use-case-manager.module';
@Module({
  imports: [UseCaseManagerModule],
  providers: [SampleResolver],
})
export class GraphQLResolversModule {}
