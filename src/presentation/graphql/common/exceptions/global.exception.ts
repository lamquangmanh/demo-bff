import { ExceptionFilter, Catch } from '@nestjs/common';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor() {}

  catch(exception: any): void {
    console.error('🚀 ~ GlobalException ~ exception:', exception);

    if (exception?.errorCode) {
      throw new GraphQLError(
        '', // error message
        {
          extensions: {
            code:
              exception.errorCode || //
              exception.message?.toUpperCase()?.trim()?.replaceAll(' ', '_'),
            devMessage: exception?.devMessage,
          },
        },
      );
    }
  }
}

export const formatError = (formattedError: GraphQLFormattedError): GraphQLFormattedError => {
  const extensions = formattedError?.extensions;
  console.error('🚀 ~ GraphqlException ~ error:', formattedError);

  return {
    message: formattedError.message,
    ...(process.env.ENV === 'DEV'
      ? { locations: formattedError.locations, path: formattedError.path }
      : {}),
    extensions: {
      ...extensions,
      ...(process.env.ENV === 'DEV' ? { devMessage: extensions.devMessage } : {}),
    },
  };
};
