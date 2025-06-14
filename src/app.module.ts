import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { DateTimeResolver } from 'graphql-scalars';
import { JwtModule } from '@nestjs/jwt';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// import from common
import { configValidationSchema } from './common/configs';
import { graphqlFormatError } from './common/utils';
import { FlexibleValueScalar } from './common/scalars';
// register the enum with GraphQL
import './common/graphql-enum';
// import from middleware
import { JwtDecodeMiddleware } from './common/middlewares';

// import from presentation
import {
  CommonModule,
  ModuleModule,
  ResourceModule,
  ActionModule,
  RoleModule,
  UserModule,
  AuthModule,
  MenuModule,
  PermissionModule,
  ProductModule,
} from './presentation/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: configValidationSchema,
    }),
    // no secret needed for decode-only
    JwtModule.register({}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      formatError: graphqlFormatError,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // resolvers: {
      //   DateTime: DateTimeResolver,
      // },
      // Pass the user context to the resolvers
      context: ({ req }) => ({ req, user: req['user'] }),
    }),

    // load presentation modules
    CommonModule,
    ModuleModule,
    ResourceModule,
    ActionModule,
    RoleModule,
    UserModule,
    AuthModule,
    MenuModule,
    PermissionModule,
    ProductModule,
  ],
  controllers: [],
  providers: [FlexibleValueScalar],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtDecodeMiddleware).forRoutes('*');
  }
}
