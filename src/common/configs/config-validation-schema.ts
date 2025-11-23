import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Environment variables
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'stag', 'production')
    .required(),

  // Server configuration port running
  PORT: Joi.number().default(3000),

  // Configuration for the Backend service
  BE_HTTP_URL: Joi.string().required(),
  BE_GRPC_URL: Joi.string().required(),

  // GraphQL Playground enable flag
  GRAPHQL_PLAYGROUND_ENABLED: Joi.boolean().default(false),

  // JWT configuration
  JWT_SECRET: Joi.string().required(),

  // Redis configuration
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASS: Joi.string().optional(),
  REDIS_DB: Joi.number().default(0),
  REDIS_KEY_PREFIX: Joi.string().default('user_bff_socket_service:'),
  REDIS_QUEUE_PREFIX: Joi.string().default('user_queue:'),
});

export const getConfiguration = () => {
  return {
    // Environment variables
    NODE_ENV: process.env.NODE_ENV,

    // Server configuration port running
    PORT: process.env.PORT,

    // gRPC server configuration
    BE_HTTP_URL: process.env.BE_HTTP_URL,
    BE_GRPC_URL: process.env.BE_GRPC_URL,

    // GraphQL Playground enable flag
    GRAPHQL_PLAYGROUND_ENABLED:
      process.env.GRAPHQL_PLAYGROUND_ENABLED === 'true',

    // JWT configuration
    JWT_SECRET: String(process.env.JWT_SECRET ?? ''),

    // Redis configuration
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_PASS: process.env.REDIS_PASS,
    REDIS_DB: Number(process.env.REDIS_DB ?? 0),
    REDIS_KEY_PREFIX: 'user_bff_socket_service:',
    REDIS_QUEUE_PREFIX: 'user_queue:',
  };
};

export const configs = getConfiguration();
console.log('Configuration loaded:', configs);
