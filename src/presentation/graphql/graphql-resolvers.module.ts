import { Module } from '@nestjs/common';
import { SampleResolver } from './resolvers/sample/sample.resolver';
import { UseCaseManagerModule } from '@src/infrastructure/use-case-manager/use-case-manager.module';
import { UserResolver } from './resolvers/users/user.resolver';
@Module({
  controllers: [],
  imports: [UseCaseManagerModule],
  providers: [SampleResolver, UserResolver],
})
export class GraphQLResolversModule {}
