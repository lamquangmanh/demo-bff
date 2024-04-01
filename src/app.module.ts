import { Module } from '@nestjs/common';
import { GraphQLConfigsModule } from './infrastructure/configs/graphql.config';
import { GraphQLResolversModule } from './presentation/graphql/graphql-resolvers.module';
import { ConfigModule } from './infrastructure/configs/env.config';
import { APP_FILTER } from '@nestjs/core';
import {
  GlobalException,
  formatError,
} from './presentation/graphql/common/exceptions/global.exception';

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
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalException,
    },
  ],
})
export class AppModule {}
