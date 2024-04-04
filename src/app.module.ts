import { Module } from '@nestjs/common';
import { GraphQLConfigsModule } from './infrastructure/configs/graphql.config';
import { GraphQLResolversModule } from './presentation/graphql/graphql-resolvers.module';
import { ConfigModule } from './infrastructure/configs/env.config';
import { APP_FILTER } from '@nestjs/core';
import {
  GlobalException,
  formatError,
} from './presentation/graphql/common/exceptions/global.exception';
import { LoggerModule } from './infrastructure/libs/logger';
import { JsonScalar } from './presentation/graphql/common/scalar/json.scalar';

@Module({
  imports: [
    ConfigModule,
    GraphQLConfigsModule.register({
      formatError,
      context: (req) => req,
    }),
    GraphQLResolversModule,
    LoggerModule,
  ],
  providers: [
    JsonScalar,
    {
      provide: APP_FILTER,
      useClass: GlobalException,
    },
  ],
})
export class AppModule {}
