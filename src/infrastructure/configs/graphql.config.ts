import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

interface GraphQLConfigsModuleRegisterInterface {
  context: any;
  formatError: (
    formattedError: GraphQLFormattedError,
    error: unknown,
  ) => GraphQLFormattedError;
}

@Module({})
export class GraphQLConfigsModule {
  static register(param: GraphQLConfigsModuleRegisterInterface): DynamicModule {
    const { formatError, context } = param;

    return {
      module: GraphQLConfigsModule,
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            return {
              playground: !config.get<boolean>('isProd', false),
              autoSchemaFile: path.join(
                `${config.get<boolean>('isDev', true) ? 'src' : 'dist'}/graphql`,
                'schema.gql',
              ),
              sortSchema: true,
              // installSubscriptionHandlers: true,
              // subscriptions: {
              //     'graphql-ws': true,
              // },
              formatError,
              context,
            };
          },
        }),
      ],
    };
  }
}
