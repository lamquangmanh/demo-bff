import { Module } from '@nestjs/common';
import { GraphQLConfigsModule } from './infrastructure/configs/graphql.config';
import { formatError } from 'graphql';
import { GraphQLResolversModule } from './graphql/graphql-resolvers.module';
import { ConfigModule } from './infrastructure/configs/env.config';

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
  ],
  providers: [],
})
export class AppModule {}
