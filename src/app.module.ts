import { Module } from '@nestjs/common';
import { GraphQLConfigsModule } from './infrastructure/configs/graphql.config';
import { GraphQLResolversModule } from './graphql/graphql-resolvers.module';
import { ConfigModule } from './infrastructure/configs/env.config';
import { formatError } from './graphql/common/exceptions/global.exception';
import { UseCaseProxyModule } from './infrastructure/useCaseProxy/useCaseProxy.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLConfigsModule.register({
      formatError,
      context: () => {
        return {
          dataLoaders: {},
        };
      },
    }),
    GraphQLResolversModule,
    UseCaseProxyModule,
  ],
  providers: [],
})
export class AppModule {}
