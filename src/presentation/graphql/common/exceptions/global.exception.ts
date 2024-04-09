import { ExceptionFilter, Catch, Inject } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor(@Inject(LoggerAbstract) private logger: LoggerAbstract) {
    logger.init('AppModule', 'GlobalException');
  }

  catch(exception: any): void {
    this.logger.error(`~ exception: ${JSON.stringify(exception)}`);

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

export const formatError = (formattedError: GraphQLFormattedError): any => {
  const extensions = formattedError?.extensions;
  const [code, statusCode, subMessage] = [
    extensions['code'],
    extensions['statusCode'],
    extensions['message'],
  ];
  const subMessageObj = subMessage
    ? {
        subMessage,
      }
    : {};

  delete extensions['code'];
  delete extensions['statusCode'];
  delete extensions['message'];

  if (['STG', 'PROD'].includes(process.env.ENV)) {
    return Object.assign(
      {
        message: formattedError.message,
        code,
        statusCode,
      },
      subMessageObj,
    );
  }

  return Object.assign(
    {
      ...formattedError,
      code,
      statusCode,
      extensions,
    },
    subMessageObj,
  );
};
