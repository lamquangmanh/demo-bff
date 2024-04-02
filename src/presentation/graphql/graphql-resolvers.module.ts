import { Module } from '@nestjs/common';
import { SampleResolver } from './resolvers/sample/sample.resolver';
import { UseCaseManagerModule } from '@src/infrastructure/use-case-manager/use-case-manager.module';
import { UserResolver } from './resolvers/user/user.resolver';
@Module({
  imports: [UseCaseManagerModule],
  providers: [SampleResolver, UserResolver],
})
export class GraphQLResolversModule {}
