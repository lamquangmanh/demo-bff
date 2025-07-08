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
});

export const getConfiguration = () => {
  return {
    // Environment variables
    NODE_ENV: process.env.NODE_ENV,

    // Server configuration port running
    PORT: process.env.PORT,

    // gRPC server configuration
    BE_HTTP_URL: process.env.GRPC_HOST,
    BE_GRPC_URL: Number(process.env.GRPC_PORT),
  };
};

console.log('Configuration loaded:', getConfiguration());
