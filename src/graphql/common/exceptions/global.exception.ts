import { ExceptionFilter, Catch } from '@nestjs/common';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor() {}

  catch(exception: any): void {
    console.error('🚀 ~ GlobalException ~ exception:', exception);

    if (exception?.errorCode) {
      throw new GraphQLError('', {
        extensions: {
          code:
            exception.errorCode || //
            exception?.message?.toUpperCase()?.trim()?.replaceAll(' ', '_'),
          devMessage: exception?.devMessage,
        },
      });
    }
  }
}

export const formatError = (formattedError: GraphQLFormattedError): any => {
  const extensions = formattedError?.extensions;
  console.error('🚀 ~ GraphqlException ~ error:', formattedError);

  return {
    errorCode: extensions['code'] || '',
    data: extensions['data'] || null,
    devMessage: extensions['devMessage'] || undefined,
  };
};
